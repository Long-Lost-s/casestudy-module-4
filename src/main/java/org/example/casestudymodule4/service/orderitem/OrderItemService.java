package org.example.casestudymodule4.service.orderitem;

import org.example.casestudymodule4.model.OrderItem;
import org.example.casestudymodule4.repository.OrderItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    private final OrderItemRepo orderItemRepo;

    @Autowired
    public OrderItemService(OrderItemRepo orderItemRepo) {
        this.orderItemRepo = orderItemRepo;
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepo.findAll();
    }

    public Optional<OrderItem> getOrderItemById(Long id) {
        return orderItemRepo.findById(id);
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        // Thực hiện logic nghiệp vụ trước khi lưu (ví dụ: kiểm tra món ăn có tồn tại,...)
        return orderItemRepo.save(orderItem);
    }

    public OrderItem updateOrderItem(Long id, OrderItem updatedOrderItem) {
        return orderItemRepo.findById(id)
                .map(existingOrderItem -> {
                    // Cập nhật các trường cần thiết của existingOrderItem bằng updatedOrderItem
                    if (updatedOrderItem.getOrder() != null) {
                        existingOrderItem.setOrder(updatedOrderItem.getOrder());
                    }
                    if (updatedOrderItem.getFood() != null) {
                        existingOrderItem.setFood(updatedOrderItem.getFood());
                    }
                    if (updatedOrderItem.getQuantity() > 0) {
                        existingOrderItem.setQuantity(updatedOrderItem.getQuantity());
                    }
                    if (updatedOrderItem.getPrice() > 0) {
                        existingOrderItem.setPrice(updatedOrderItem.getPrice());
                    }
                    return orderItemRepo.save(existingOrderItem);
                })
                .orElse(null); // Hoặc throw exception nếu muốn
    }

    public boolean deleteOrderItem(Long id) {
        return orderItemRepo.findById(id)
                .map(orderItem -> {
                    orderItemRepo.delete(orderItem);
                    return true;
                })
                .orElse(false); // Hoặc throw exception nếu muốn
    }
}