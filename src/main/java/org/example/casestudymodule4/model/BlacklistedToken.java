package org.example.casestudymodule4.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "blacklisted_tokens")
public class BlacklistedToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 512)
    private String token;

    @Column(nullable = false)
    private Date expiration;

    public BlacklistedToken() {}

    public BlacklistedToken(String token, Date expiration) {
        this.token = token;
        this.expiration = expiration;
    }

    public String getToken() { return token; }
    public Date getExpiration() { return expiration; }
}
