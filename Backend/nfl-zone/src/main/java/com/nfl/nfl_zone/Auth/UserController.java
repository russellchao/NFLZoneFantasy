package com.nfl.nfl_zone.Auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
        return userService.verifyUser(token);
    }

    @GetMapping("/confirmPwReset")
    public String sendPwResetEmail(@RequestParam String username) {
        return userService.sendPasswordResetEmail(username);
    }

    @PostMapping("/resetPw")
    public String resetPassword(@RequestParam String username, @RequestBody String newPassword) {
        return userService.resetPassword(username, newPassword);
    }
}

















