package org.example.casestudymodule4.repository;

import org.example.casestudymodule4.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Bạn có thể thêm các phương thức truy vấn tùy chỉnh nếu cần
}