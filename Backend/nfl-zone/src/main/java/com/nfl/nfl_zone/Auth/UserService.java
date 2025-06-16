package com.nfl.nfl_zone.Auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

        // Step 4: Send the verification email
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

        // Temporarily assume login is successful - 2FA comes after this
        return "Login successful";
    }

}






















