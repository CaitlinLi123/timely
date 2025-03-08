package com.example.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.user.dao.UserDao;
import com.example.user.model.User;
import com.example.user.model.UserPrincipal;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserDao dao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = dao.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User 404");
        }
        return new UserPrincipal(user);
    }
}
