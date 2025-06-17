package com.nfl.nfl_zone.Auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public UserService(UserRepository userRepository, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }


    private void sendVerificationEmail(User user) {
        String token = user.getVerifToken();
        String verificationLink = "http://localhost:8081/api/v1/auth/verify?token=" + token;

        // String verificationLink = "https://nflzone.herokuapp.com/api/v1/auth/verify?token=" + token;

        // PAUSE HERE: I may start hosting the backend on heroku.

        String subject = "Confirm your NFL Zone account";
        String body = String.format(
                "Hi %s (%s), \n\n" + "Please verify your email by clicking the link below: "
                + "\n%s\n\nIf you didn't register, please ignore this email.\n\nThank you,\nThe NFL Zone Team",
                user.getFullName(),
                user.getUsername(),
                verificationLink
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("NFL Zone <nflzoneapp@gmail.com>");

        // make the verification email unrepliable by sending any reply attempts to a nonexistent email
        message.setReplyTo("no-reply@nflzone.com");

        mailSender.send(message);
    }


    public String registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists";
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";
        }

        // Proceed with the following steps if the username and email are valid

        // Step 1: Encode the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // Step 2: Generate and assign a verification token to the user
        String token = UUID.randomUUID().toString();
        user.setVerifToken(token);
        user.setVerified(false); // initially mark that the email is unverified

        // Step 3: Save the user to the 'users' table in PostgreSQL
        userRepository.save(user);

        // Final Step: Send the verification email
        sendVerificationEmail(user);

        return "User registered successfully, check your email for a verification email";
    }


    public String loginUser(String username, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(rawPassword, user.getPassword())) {
            return "Invalid password";
        }

        if (!user.isVerified()) {
            return "Email not verified, please check your inbox for a verification email";
        }

        return "Login successful";
    }

}






















