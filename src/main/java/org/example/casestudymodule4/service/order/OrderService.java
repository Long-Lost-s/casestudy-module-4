package org.example.casestudymodule4.service.order;

import org.example.casestudymodule4.model.Order;
import org.example.casestudymodule4.model.OrderItem;
import org.example.casestudymodule4.repository.OrderItemRepo;
import org.example.casestudymodule4.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo, OrderItemRepo orderItemRepo) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepo.findById(id);
    }

    public Order createOrder(Order order) {
        // Thực hiện logic nghiệp vụ trước khi lưu (ví dụ: tính tổng tiền, kiểm tra tồn kho,...)
        return orderRepo.save(order);
    }

    public Order updateOrder(Long id, Order updatedOrder) {
        return orderRepo.findById(id)
                .map(existingOrder -> {
                    // Cập nhật các trường cần thiết của existingOrder bằng updatedOrder
                    if (updatedOrder.getUser() != null) {
                        existingOrder.setUser(updatedOrder.getUser());
                    }
                    if (updatedOrder.getQuantity() > 0) {
                        existingOrder.setQuantity(updatedOrder.getQuantity());
                    }
                    if (updatedOrder.getTotalPrice() > 0) {
                        existingOrder.setTotalPrice(updatedOrder.getTotalPrice());
                    }
                    if (updatedOrder.getOrderStatus() != null) {
                        existingOrder.setOrderStatus(updatedOrder.getOrderStatus());
                    }
                    // Không cập nhật createdAt vì nó là trường updatable = false
                    return orderRepo.save(existingOrder);
                })
                .orElse(null); // Hoặc throw exception nếu muốn
    }

    public boolean deleteOrder(Long id) {
        return orderRepo.findById(id)
                .map(order -> {
                    orderRepo.delete(order);
                    return true;
                })
                .orElse(false); // Hoặc throw exception nếu muốn
    }
}