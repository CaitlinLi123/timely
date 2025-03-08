package com.example.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.user.dao.UserDao;
import com.example.user.model.User;

@Service
public class UserService {

    private final UserDao dao;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    public UserService(UserDao dao) {
        this.dao = dao;
    }

    public ResponseEntity<String> register(User user) {
        User userExist = dao.findByUsername(user.getUsername());
        if (userExist != null)
            return new ResponseEntity<>("This username already exists!", HttpStatus.BAD_REQUEST);
        user.setPassword(encoder.encode(user.getPassword()));
        try {
            dao.save(user);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
    }

}
