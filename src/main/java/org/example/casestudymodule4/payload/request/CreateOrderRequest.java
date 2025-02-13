package org.example.casestudymodule4.payload.request;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List; // Import List

@Getter
@Setter
public class CreateOrderRequest {

    @NotBlank(message = "Tên khách hàng không được để trống")
    private String customerName;

    @NotBlank(message = "Số điện thoại không được để trống")
    private String customerPhone;

    @NotBlank(message = "Địa chỉ giao hàng không được để trống")
    private String deliveryAddress;

    @NotNull(message = "Danh sách món hàng không được để trống") // Validate danh sách orderItems
    private List<OrderItemRequest> orderItems; // Danh sách thông tin món ăn đặt hàng

    @Getter
    @Setter
    public static class OrderItemRequest { // DTO cho thông tin từng món hàng trong đơn
        @NotNull(message = "foodId không được để trống")
        private Long foodId;

        @NotNull(message = "quantity không được để trống")
        private int quantity;
    }

    // Không cần các trường totalPrice, quantity, orderStatus nữa ở CreateOrderRequest
    // private double totalPrice;
    // private int quantity;
    // private String orderStatus;
}