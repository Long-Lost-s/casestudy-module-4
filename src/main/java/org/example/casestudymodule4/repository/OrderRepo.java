package org.example.casestudymodule4.repository;

import org.example.casestudymodule4.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    // Không cần phương thức findAllOrdersWithOrderItemsAndFoods nữa
    // List<Order> findAllOrdersWithOrderItemsAndFoods();

    // Các phương thức truy vấn khác (nếu cần) ...
}