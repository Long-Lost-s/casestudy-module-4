package org.example.casestudymodule4.service.orderitem;

import org.example.casestudymodule4.model.OrderItem;
import org.example.casestudymodule4.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public OrderItem getOrderItemById(Long id) {
        return orderItemRepository.findById(id).orElseThrow(() -> new RuntimeException("OrderItem not found with id " + id));
    }

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }

    public OrderItem updateOrderItem(Long id, OrderItem orderItemDetails) {
        Optional<OrderItem> optionalOrderItem = orderItemRepository.findById(id);
        if (optionalOrderItem.isPresent()) {
            OrderItem orderItem = optionalOrderItem.get();
            // Cập nhật các trường có thể chỉnh sửa của OrderItem
            orderItem.setOrder(orderItemDetails.getOrder()); // Cần xem xét logic cập nhật order
            orderItem.setFood(orderItemDetails.getFood());  // Cần xem xét logic cập nhật food
            orderItem.setQuantity(orderItemDetails.getQuantity());
            orderItem.setPrice(orderItemDetails.getPrice());
            return orderItemRepository.save(orderItem);
        } else {
            throw new RuntimeException("OrderItem not found with id " + id);
        }
    }
}