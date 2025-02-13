package org.example.casestudymodule4.repository;

import org.example.casestudymodule4.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    // Bạn có thể thêm các phương thức truy vấn tùy chỉnh nếu cần, ví dụ:
    // List<Order> findByUser(User user);
    // List<Order> findByOrderStatus(OrderStatus orderStatus);
}