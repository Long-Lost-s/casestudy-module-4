package org.example.casestudymodule4.security.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import org.example.casestudymodule4.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${sean.app.jwtSecret}")
  private String jwtSecret;

  @Value("${sean.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  @Value("${sean.app.jwtCookieName}")
  private String jwtCookie;

  private static final Set<String> invalidatedTokens = new HashSet<>(); // ✅ In-Memory Blacklist

  // ✅ (Optional) Database-Based Blacklist (Commented for Future Use)
  // @Autowired
  // private BlacklistedTokenRepository blacklistedTokenRepository;

  public String getJwtFromCookies(HttpServletRequest request) {
    Cookie cookie = WebUtils.getCookie(request, jwtCookie);
    return (cookie != null) ? cookie.getValue() : null;
  }

  public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal) {
    String jwt = generateTokenFromUser(userPrincipal);
    return ResponseCookie.from(jwtCookie, jwt)
            .path("/api")
            .maxAge(jwtExpirationMs / 1000)
            .httpOnly(true)
            .build();
  }

  public ResponseCookie getCleanJwtCookie() {
    return ResponseCookie.from(jwtCookie, null)
            .path("/api")
            .maxAge(0)
            .build();
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build()
            .parseClaimsJws(token).getBody().getSubject();
  }

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public boolean validateJwtToken(String authToken) {
    if (invalidatedTokens.contains(authToken)) {
      logger.error("JWT token has been invalidated.");
      return false;
    }

    // ✅ (Optional) Check Database for Blacklisted Tokens
    // if (blacklistedTokenRepository.existsByToken(authToken)) {
    //    logger.error("JWT token is blacklisted (Database).");
    //    return false;
    // }

    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
      return true;
    } catch (JwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    }
    return false;
  }

  public void invalidateToken(String token) {
    invalidatedTokens.add(token); // ✅ In-Memory Blacklist

    // ✅ (Optional) Save to Database
    // BlacklistedToken blacklistedToken = new BlacklistedToken(token, new Date());
    // blacklistedTokenRepository.save(blacklistedToken);
  }

  public String generateTokenFromUser(UserDetailsImpl userPrincipal) {
    List<String> roles = userPrincipal.getAuthorities().stream()
            .map(authority -> authority.getAuthority())
            .collect(Collectors.toList());

    return Jwts.builder()
            .setSubject(userPrincipal.getUsername())
            .claim("roles", roles)
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
            .signWith(key(), SignatureAlgorithm.HS256)
            .compact();
  }
}
