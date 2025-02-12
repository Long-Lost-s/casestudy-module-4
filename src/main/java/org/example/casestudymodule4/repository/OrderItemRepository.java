package org.example.casestudymodule4.repository;

import org.example.casestudymodule4.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    // Bạn có thể thêm các phương thức truy vấn tùy chỉnh nếu cần
}