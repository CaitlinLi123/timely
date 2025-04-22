package com.example.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.RestController;

import com.example.user.model.OauthResponse;
import com.example.user.model.ResetPwdDto;
import com.example.user.model.User;
import com.example.user.model.validateResponse;
import com.example.user.service.JwtService;
import com.example.user.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody User user, HttpServletResponse response) {
        return userService.login(user, response);
    }

    @GetMapping("/validate")
    public ResponseEntity<validateResponse> checkCookie(HttpServletRequest request) {
        return userService.validate(request);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate session
        request.getSession().invalidate();

        // Remove the JWT cookie
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Change to true if using HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immediately
        response.addCookie(cookie);

        return new ResponseEntity<>("logout successful!", HttpStatus.OK);
    }

    // after authenticated from google
    @GetMapping("/oauth2/user-info")
    public ResponseEntity<OauthResponse> getUserInfo(@AuthenticationPrincipal OAuth2User principal,
            HttpServletResponse response) {
        return userService.oauth2WithGoogle(principal, response);
    }

    @PostMapping("/link-google-account")
    public ResponseEntity<String> getMethodName(@RequestBody User user) {
        return userService.linkGoogleAccount(user);
    }

    @GetMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestParam String email) {
        return userService.sendEmail(email);
    }

    @GetMapping("/validate-recovery-path")
    public ResponseEntity<String> getMethodName(@RequestParam String token, HttpServletResponse response) {
        return userService.validateRecoveryPath(token, response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPwdDto resetPwdDto, HttpServletResponse response) {
        return userService.resetPassword(resetPwdDto, response);
    }

}
