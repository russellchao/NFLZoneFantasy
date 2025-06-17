package com.nfl.nfl_zone.Auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest loginRequest) {
        return userService.loginUser(loginRequest.username, loginRequest.password);
    }

    @GetMapping("/verify")
    public RedirectView verifyUser(@RequestParam String token) {
        Optional<User> optionalUser = userRepository.findByVerifToken(token);

        if (optionalUser.isEmpty()) {
            return new RedirectView("http://localhost:3000/verify_fail");
        }

        User user = optionalUser.get();
        user.setVerified(true);
        user.setVerifToken(null); // if verification is successful, clear the verification token to prevent reuse

        userRepository.save(user);

        return new RedirectView("http://localhost:3000/verify_success");
    }
}

















