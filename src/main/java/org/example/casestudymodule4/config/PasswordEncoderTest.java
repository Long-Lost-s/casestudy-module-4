package org.example.casestudymodule4.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderTest {
    public static void main(String[] args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        String encodedPassword1 = passwordEncoder.encode("123456");
        String encodedPassword2 = passwordEncoder.encode("123456");
        String encodedPassword3 = passwordEncoder.encode("123456");

        System.out.println("admin@example.com: " + encodedPassword1);
        System.out.println("user@example.com: " + encodedPassword2);
        System.out.println("seller@example.com: " + encodedPassword3);
    }
}
