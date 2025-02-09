package org.example.casestudymodule4.security.jwt;

import org.example.casestudymodule4.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
          throws ServletException, IOException {

    try {
      String jwt = parseJwt(request);
      System.out.println("JWT extracted from request: " + jwt);  // ✅ Debug Log

      if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        System.out.println("Extracted Username: " + username);  // ✅ Debug Log

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        System.out.println("Loaded User Details: " + userDetails.getUsername() + " | Roles: " + userDetails.getAuthorities());  // ✅ Debug Log

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("Authentication Set in SecurityContext!");  // ✅ Debug Log
      } else {
        System.out.println("JWT Validation Failed!");  // ✅ Debug Log
      }
    } catch (Exception e) {
      System.err.println("Error in authentication: " + e.getMessage());
    }

    filterChain.doFilter(request, response);
  }

  private String parseJwt(HttpServletRequest request) {
    String headerAuth = request.getHeader("Authorization");

    System.out.println("Headers in Request: " + request.getHeaderNames());  // ✅ Debugging
    System.out.println("Authorization Header: " + headerAuth);  // ✅ Debugging

    if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
      return headerAuth.substring(7);
    }

    System.out.println("No Bearer Token Found!");  // ✅ Debugging
    return null;
  }
}
