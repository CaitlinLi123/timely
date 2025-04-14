package com.example.user.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private String exprirationMs;

    @Value("${recoverySecret}")
    private String recoverySecret;
    private int recoveryExpire = 10 * 60 * 1000;

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + Integer.parseInt(exprirationMs)))
                .signWith(getKey(secretKey), SignatureAlgorithm.HS256).compact();
    }

    public String generateRecoverPwdToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + recoveryExpire))
                .signWith(getKey(recoverySecret), SignatureAlgorithm.HS256).compact();
    }

    private Key getKey(String key) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject, secretKey);
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject, recoverySecret);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver, String key) {
        final Claims claims = extractAllClaims(token, key);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token, String key) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey(key))
                .build().parseClaimsJws(token).getBody();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token, secretKey));
    }

    public boolean ValidateEmailFromToken(String token, String email) {
        return (email.equals(extractEmail(token)) && !isTokenExpired(token, recoverySecret));
    }

    private boolean isTokenExpired(String token, String key) {
        return extractExpiration(token, key).before(new Date());
    }

    private Date extractExpiration(String token, String key) {
        return extractClaim(token, Claims::getExpiration, key);
    }

}
