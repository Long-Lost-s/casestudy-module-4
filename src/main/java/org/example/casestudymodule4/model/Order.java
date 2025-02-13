package org.example.casestudymodule4.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // ❌ Loại bỏ trường và annotation liên quan đến OrderItem
    // @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // private List<OrderItem> orderItems;

    @Column(nullable = true)
    private int quantity; // Có thể bỏ trường này nếu không còn cần thiết

    @Column(nullable = true)
    private double totalPrice; // Giữ lại trường totalPrice

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private OrderStatus orderStatus = OrderStatus.PENDING;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ Thêm các trường thông tin khách hàng
    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerPhone;

    @Column(nullable = false)
    private String deliveryAddress;

    // ✅ Thêm trường để lưu thông tin món ăn trực tiếp (ví dụ: tên món và số lượng, dùng String đơn giản để minh họa)
    @Column(nullable = true, columnDefinition = "TEXT") // TEXT để chứa chuỗi dài
    private String foodNames; // Danh sách tên món ăn, phân tách bằng dấu phẩy

    @Column(nullable = true, columnDefinition = "TEXT") // TEXT để chứa chuỗi dài
    private String foodQuantities; // Danh sách số lượng món ăn, phân tách bằng dấu phẩy

    // Getter và Setter (Lombok tự động tạo)
}