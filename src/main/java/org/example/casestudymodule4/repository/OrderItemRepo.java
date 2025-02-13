package org.example.casestudymodule4.repository;

import org.example.casestudymodule4.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
    // Bạn có thể thêm các phương thức truy vấn tùy chỉnh nếu cần, ví dụ:
    // List<OrderItem> findByOrder(Order order);
    // List<OrderItem> findByFood(Food food);
}