package org.example.casestudymodule4.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "foods")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String openTime;

    @Column(nullable = false)
    private String closeTime;

    private String notes;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private double discountPrice;

    @ManyToOne
    @JoinColumn(name = "service_fee_id")
    private ServiceFee serviceFee;

    @Column(nullable = false)
    private int preparationTime;

    private String discountCode;
    private int discountUsageCount = 0;
    private int views = 0;
    private int orderCount = 0;
    private boolean featured = false;
    private boolean specialOffer = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    private String restaurantName;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
