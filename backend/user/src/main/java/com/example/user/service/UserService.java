package com.example.user.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.user.dao.UserDao;
import com.example.user.model.User;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class UserService {

    private final UserDao dao;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public UserService(UserDao dao, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.dao = dao;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public ResponseEntity<String> register(User user) {
        User userExist = dao.findByUsername(user.getUsername());
        if (userExist != null)
            return new ResponseEntity<>("This username already exists!", HttpStatus.BAD_REQUEST);
        if (dao.findByEmail(user.getEmail()) != null)
            return new ResponseEntity<>("This email already has an account!", HttpStatus.BAD_REQUEST);
        user.setPassword(encoder.encode(user.getPassword()));
        try {
            dao.save(user);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity<String> login(User user, HttpServletResponse response) {
        String username = dao.findByEmail(user.getEmail()).getUsername();
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, user.getPassword()));
        if (authentication.isAuthenticated()) {
            // return new ResponseEntity<>(jwtService.generateToken(user.getUsername()),
            // HttpStatus.OK);
            String token = jwtService.generateToken(user.getUsername());
            Cookie jwtCookie = new Cookie("jwt", token);
            jwtCookie.setHttpOnly(true);// Prevent JavaScript access
            jwtCookie.setSecure(true);// Set to true in production (HTTPS only)
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(259200);
            // jwtCookie.setAttribute("SameSite", "None");
            response.addCookie(jwtCookie);
            return ResponseEntity.ok("Login successful");
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }

}
