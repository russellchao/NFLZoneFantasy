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

    public String loginUser(String username, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return "User not found.";
        }

        User user = optionalUser.get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(rawPassword, user.getPassword())) {
            return "Invalid password.";
        }

        if (!user.isVerified()) {
            return "Email not verified, please check your inbox for a verification email.";
        }

        return "Login successful.";
    }

    public String registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists.";
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists.";
        }

        if (user.getUsername().length() < 3 || user.getUsername().length() > 32) {
            return "Username must be between 3-32 characters long.";
        }

        if (user.getPassword().length() < 8 || user.getPassword().length() > 32) {
            return "Password must be between 8-32 characters long.";
        }

        if (user.getPassword().equalsIgnoreCase(user.getUsername())) {
            return "Username and password cannot be the same.";
        }

        if (user.getPassword().equalsIgnoreCase(user.getEmail())) {
            return "Email and password cannot be the same.";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String token = UUID.randomUUID().toString();
        user.setVerifToken(token);
        user.setVerified(false); // initially mark that the email is unverified
        user.setPoints(0);
        userRepository.save(user);

        sendVerificationEmail(user);

        return "User registered successfully, check your email for a verification link.";
    }

    private void sendVerificationEmail(User user) {
        String token = user.getVerifToken();
        String verificationLink = String.format("http://localhost:3002/verify_user/%s", token);

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
        message.setFrom("no-reply@nflzone.com");
        message.setReplyTo("no-reply@nflzone.com");

        mailSender.send(message);
    }

    public String verifyUser(String token) {
        Optional<User> optionalUser = userRepository.findByVerifToken(token);

        if (optionalUser.isEmpty()) {
            return "Verification failed. Please try again.";
        }

        User user = optionalUser.get();

        if (user.isVerified()) {
            return "Verification failed. Please try again.";
        }

        user.setVerified(true);
        user.setVerifToken(null); // if verification is successful, clear the verification token to prevent reuse
        userRepository.save(user);

        return "Verification successful. You may now log in.";
    }

    public String sendPasswordResetEmail(String username) {

        // Check if the user exists
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return "User not found.";
        }

        User user = optionalUser.get();

        // Generate a new verification token for the user that wants to reset their password
        String token = UUID.randomUUID().toString();
        user.setVerifToken(token);
        userRepository.save(user);

        String passwordResetLink = String.format("http://localhost:3002/create_new_password/%s/%s", username, token);
        String subject = "Reset your NFL Zone password";
        String body = String.format(
                "Hi %s (%s), \n\n" + "Please reset your password by clicking the link below: "
                        + "\n%s\n\nIf you didn't request a password reset, please ignore this email.\n\nThank you,\nThe NFL Zone Team",
                user.getFullName(),
                user.getUsername(),
                passwordResetLink
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("no-reply@nflzone.com");
        message.setReplyTo("no-reply@nflzone.com");

        mailSender.send(message);

        return "Password reset email sent to " + user.getEmail();
    }

    public String resetPassword(String username, String newPassword, String token) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();

        if (!token.equals(user.getVerifToken())) {
            // Return an error if the PW reset link is invalid
            return "Invalid or expired link. Please go back to the Login page and click 'Reset Password' again.";
        }

        System.out.println("DEBUG: New Password: " + newPassword);

        if (newPassword.length() < 8 || newPassword.length() > 32) {
            return "Password must be between 8-32 characters long";
        }

        if (username.equalsIgnoreCase(newPassword)) {
            return "Username and password cannot be the same";
        }

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            return "New password cannot be the same as the current password (perhaps you didn't forget your password!)";
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setVerifToken(null); // nullify the token of the PW reset link to prevent its reuse
        userRepository.save(user);

        return "Password reset successfully, you may now log in.";
    }

    public Integer getPoints(String username) {
        User user = userRepository.findByUsername(username).get();
        return user.getPoints();
    }

    public void setPoints(String username, Integer points) {
        User user = userRepository.findByUsername(username).get();
        user.setPoints(points);
        userRepository.save(user);
    }

    public HashMap<String, Integer> getLeaderboard() {
        HashMap<String, Integer> leaderboard = new HashMap<>();
        List<User> allUsers = userRepository.findAll();

        for (User user : allUsers) {
            leaderboard.put(user.getUsername(), user.getPoints());
        }

        return leaderboard;
    }

}






















