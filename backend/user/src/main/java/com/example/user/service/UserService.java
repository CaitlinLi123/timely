package com.example.user.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.example.user.dao.UserDao;
import com.example.user.model.OauthResponse;
import com.example.user.model.ResetPwdDto;
import com.example.user.model.User;
import com.example.user.model.UserDto;
import com.example.user.model.validateResponse;

import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class UserService {

    private final UserDao dao;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JavaMailSender mailSender;

    @Autowired
    public UserService(UserDao dao, AuthenticationManager authenticationManager, JwtService jwtService,
            JavaMailSender mailSender) {
        this.dao = dao;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.mailSender = mailSender;
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

    private void addTokenToResponse(String username, HttpServletResponse response, int maxAge, String cookieName) {
        String token = jwtService.generateToken(username, maxAge); // this is milliseconds
        Cookie jwtCookie = new Cookie(cookieName, token);
        jwtCookie.setHttpOnly(true);// Prevent JavaScript access
        jwtCookie.setSecure(true);// Set to true in production (HTTPS only)
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(maxAge / 1000); // this is seconds
        // jwtCookie.setAttribute("SameSite", "None");
        response.addCookie(jwtCookie);
    }

    private void deleteTokenToResponse(String cookieName, HttpServletResponse response) {
        // Remove the JWT cookie
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Change to true if using HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immediately
        response.addCookie(cookie);
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
        User userInDb = dao.findByEmail(user.getEmail());
        if (userInDb == null) {
            return new ResponseEntity<>("This email has not registered.", HttpStatus.NOT_FOUND);
        }
        if (user.getPassword() != null) {
            try {
                // use normal authentication method to login
                String username = dao.findByEmail(user.getEmail()).getUsername();
                Authentication authentication = authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken(username, user.getPassword()));
                if (authentication.isAuthenticated()) {
                    addTokenToResponse(username, response, 3 * 24 * 60 * 60 * 1000, "jwt");
                    return ResponseEntity.ok("Login successful");
                } else {
                    return new ResponseEntity<>("Incorrect email or password.", HttpStatus.UNAUTHORIZED);
                }
            } catch (AuthenticationException ex) {
                return new ResponseEntity<>("Incorrect email or password.", HttpStatus.UNAUTHORIZED);
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
                addTokenToResponse(name, response, 259200, "jwt");
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
                    addTokenToResponse(userInDB.getUsername(), response, 259200, "jwt");
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
            User userFound = dao.findByEmail(user.getEmail());
            userFound.setGoogleid(user.getGoogleid());
            dao.save(userFound);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail to link your google account", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> sendEmail(String toEmail) {
        // first find whether the email is in db
        try {
            User userFound = dao.findByEmail(toEmail);
            if (userFound != null) {
                MimeMessage message = mailSender.createMimeMessage();

                MimeMessageHelper helper = new MimeMessageHelper(message);

                helper.setFrom("liyu3519@gmail.com");
                helper.setTo(toEmail);

                String token = jwtService.generateRecoverPwdToken(toEmail);
                String htmlBody = """
                        <h1>Reset Your Password</h1>
                        <p>Hello,</p>
                        <p>Click the link below to reset your password:</p>
                        <a href=
                        "http://localhost/reset?token=
                        """ + token +
                        """
                                ">Reset Password</a>
                                <br><br>
                                <p>Thanks,<br>Timely Team</p>
                                """;
                helper.setText(htmlBody, true);

                helper.setSubject("Reset your password");

                mailSender.send(message);
                System.out.println("mail sent successfully....");
                return new ResponseEntity<>("Success in sending the recovery email", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("We don't have this account in our app.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Something goes wrong" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<String> validateRecoveryPath(String token, HttpServletResponse response) {
        try {
            String email = jwtService.extractEmail(token);
            User user = dao.findByEmail(email);
            if (user != null) {
                addTokenToResponse(user.getUsername(), response, 10 * 60 * 1000, "jwt_reset");
                return new ResponseEntity<>(email, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Email not found in db", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>("Something goes wrong..." + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> resetPassword(ResetPwdDto resetPwdDto, HttpServletResponse response) {
        try {
            User user = dao.findByEmail(resetPwdDto.getEmail());
            if (user != null) {
                // System.out.println("resetPwdDto: " + resetPwdDto.getPassword());
                user.setPassword(encoder.encode(resetPwdDto.getPassword()));
                // System.out.println("user pwd: " + user.getPassword());
                // erase the token
                deleteTokenToResponse("jwt_reset", response);
                dao.save(user);

                return new ResponseEntity<>("Succeed in reseting the password", HttpStatus.OK);
            } else {
                deleteTokenToResponse("jwt_reset", response);
                return new ResponseEntity<>("User not found with the given email", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
