package com.example.user.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
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
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.example.user.dao.UserDao;
import com.example.user.model.OauthResponse;
import com.example.user.model.User;
import com.example.user.model.UserDto;
import com.example.user.model.validateResponse;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
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

    private String generateRandomUsernameSurfix() {
        String candidateChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        Random rand = new Random();
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            int randIndex = rand.nextInt(candidateChars.length());
            res.append(candidateChars.charAt(randIndex));
        }
        return res.toString();

    }

    private void addTokenToResponse(String username, HttpServletResponse response) {
        String token = jwtService.generateToken(username);
        Cookie jwtCookie = new Cookie("jwt", token);
        jwtCookie.setHttpOnly(true);// Prevent JavaScript access
        jwtCookie.setSecure(true);// Set to true in production (HTTPS only)
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(259200);
        // jwtCookie.setAttribute("SameSite", "None");
        response.addCookie(jwtCookie);
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
        if (user.getPassword() != null) {
            // use normal authentication method to login
            String username = dao.findByEmail(user.getEmail()).getUsername();
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(username, user.getPassword()));
            if (authentication.isAuthenticated()) {
                addTokenToResponse(username, response);
                return ResponseEntity.ok("Login successful");
            } else {
                return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }
        } else {
            // use oauth2
            System.out.println(user);
            return new ResponseEntity<>("Please direct user to use oauth2 login", HttpStatus.BAD_REQUEST);
        }

    }

    public ResponseEntity<OauthResponse> oauth2WithGoogle(OAuth2User principal, HttpServletResponse response) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = principal.getAttribute("email"), googleid = principal.getAttribute("sub");

        // 1. register a new user
        // whether a user is already in db
        User userInDB = dao.findByEmail(email);
        if (userInDB == null) {
            // add a new user into db;
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setGoogleid(googleid);
            // randomly generate a username
            String name = principal.getAttribute("name") + "_" + generateRandomUsernameSurfix();
            while (dao.findByUsername(name) != null) {
                name = principal.getAttribute("name") + "_" + generateRandomUsernameSurfix();
            }
            newUser.setUsername(name);
            try {
                dao.save(newUser);
                addTokenToResponse(name, response);
                return new ResponseEntity<>(new OauthResponse(newUser, "New user Created with google account"),
                        HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(new OauthResponse(null, "Something went wrong when storing new user to db"),
                        HttpStatus.BAD_REQUEST);
            }

        } else {
            // ask the user whether to link to the existing account;
            if (userInDB.getGoogleid() == null) {
                userInDB.setGoogleid(googleid);
                return new ResponseEntity<>(new OauthResponse(userInDB,
                        "There's no google account linked to an exisiting user. Ask the user to link the account"),
                        HttpStatus.OK);
            } else {
                if (userInDB.getGoogleid().equals(googleid)) {
                    addTokenToResponse(userInDB.getUsername(), response);
                    return new ResponseEntity<>(new OauthResponse(userInDB, "OK to log in"), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(
                            new OauthResponse(userInDB,
                                    "There's an exisiting google account linked to the user. Ask the user to modify the account"),
                            HttpStatus.OK);
                }
            }

        }

    }

    public ResponseEntity<validateResponse> validate(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    String username = jwtService.extractUserName(cookie.getValue());
                    User userFound = dao.findByUsername(username);
                    UserDto user = new UserDto(userFound.getId(), userFound.getUsername(), userFound.getEmail());

                    return new ResponseEntity<>(new validateResponse(
                            user, "validated"),
                            HttpStatus.OK);
                }
            }
            ;
            return new ResponseEntity<>(new validateResponse(null, "No username found in db"), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(new validateResponse(null, "No cookie sent"), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> linkGoogleAccount(User user) {
        try {
            dao.save(user);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail to link your google account", HttpStatus.BAD_REQUEST);
        }
    }
}
