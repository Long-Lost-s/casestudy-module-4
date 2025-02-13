package org.example.casestudymodule4.service.order;

import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.model.Order;
import org.example.casestudymodule4.repository.FoodRepo;
import org.example.casestudymodule4.repository.OrderRepo;
import org.example.casestudymodule4.payload.request.CreateOrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal; // ✅ Import BigDecimal
import java.math.RoundingMode; // ✅ Import RoundingMode (nếu bạn muốn làm tròn)
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepo orderRepo;
    private final FoodRepo foodRepo; // Cần FoodRepo để lấy thông tin giá món ăn

    @Autowired
    public OrderService(OrderRepo orderRepo, FoodRepo foodRepo) {
        this.orderRepo = orderRepo;
        this.foodRepo = foodRepo;
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepo.findById(id);
    }

    public Order createOrderFromRequest(CreateOrderRequest createOrderRequest) {
        Order order = new Order();
        // Set các trường từ CreateOrderRequest sang Order entity
        order.setCustomerName(createOrderRequest.getCustomerName());
        order.setCustomerPhone(createOrderRequest.getCustomerPhone());
        order.setDeliveryAddress(createOrderRequest.getDeliveryAddress());

        // ✅ Khởi tạo totalPrice là BigDecimal.ZERO
        BigDecimal totalPrice = BigDecimal.ZERO;
        StringBuilder foodNamesBuilder = new StringBuilder();
        StringBuilder foodQuantitiesBuilder = new StringBuilder();

        if (createOrderRequest.getOrderItems() != null) {
            for (CreateOrderRequest.OrderItemRequest itemRequest : createOrderRequest.getOrderItems()) {
                Optional<Food> foodOptional = foodRepo.findById(itemRequest.getFoodId());
                if (foodOptional.isPresent()) {
                    Food food = foodOptional.get();
                    int quantity = itemRequest.getQuantity();

                    // ✅ Chuyển đổi quantity (int) sang BigDecimal
                    BigDecimal quantityBigDecimal = BigDecimal.valueOf(quantity);
                    // ✅ Thực hiện phép nhân BigDecimal bằng phương thức multiply()
                    BigDecimal itemPriceBigDecimal = food.getPrice().multiply(quantityBigDecimal);

                    foodNamesBuilder.append(food.getName()).append(",");
                    foodQuantitiesBuilder.append(quantity).append(",");
                    // ✅ Cộng dồn totalPrice (BigDecimal) bằng phương thức add()
                    totalPrice = totalPrice.add(itemPriceBigDecimal);
                }
            }
        }

        // Loại bỏ dấu phẩy cuối cùng nếu có món ăn nào được thêm
        if (foodNamesBuilder.length() > 0) {
            foodNamesBuilder.deleteCharAt(foodNamesBuilder.length() - 1);
            foodQuantitiesBuilder.deleteCharAt(foodQuantitiesBuilder.length() - 1);
        }

        order.setFoodNames(foodNamesBuilder.toString());
        order.setFoodQuantities(foodQuantitiesBuilder.toString());

        // ✅  Set totalPrice vào order. Cần chuyển đổi BigDecimal sang double (nếu trường totalPrice trong Order là double)
        order.setTotalPrice(totalPrice.doubleValue()); // ⚠️ Cần xem xét kiểu dữ liệu totalPrice trong entity Order. Tốt nhất nên để BigDecimal

        return orderRepo.save(order);
    }

    public Order createOrder(Order order) {
        return orderRepo.save(order);
    }

    public Order updateOrder(Long id, Order updatedOrder) {
        return orderRepo.findById(id)
                .map(existingOrder -> {
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
                    return orderRepo.save(existingOrder);
                })
                .orElse(null);
    }

    public boolean deleteOrder(Long id) {
        try {
            orderRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            System.err.println("Lỗi khi xóa đơn hàng ID " + id + ": " + e.getMessage());
            return false;
        }
    }
}