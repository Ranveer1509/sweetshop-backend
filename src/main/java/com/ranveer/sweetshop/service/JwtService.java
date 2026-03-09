package com.ranveer.sweetshop.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkeymysecretkey";

    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 24; // 24 hours

    /* =========================
       Generate JWT Token
    ========================= */

    public String generateToken(UserDetails userDetails) {

        String role = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_USER");

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /* =========================
       Extract Username
    ========================= */

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /* =========================
       Extract Role
    ========================= */

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    /* =========================
       Validate Token
    ========================= */

    public boolean isTokenValid(String token, UserDetails userDetails) {

        final String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    /* =========================
       Check Expiration
    ========================= */

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /* =========================
       Extract Expiration
    ========================= */

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /* =========================
       Extract Claim
    ========================= */

    private <T> T extractClaim(String token, Function<Claims, T> resolver) {
        final Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    /* =========================
       Parse Token
    ========================= */

    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /* =========================
       Get Signing Key
    ========================= */

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
}