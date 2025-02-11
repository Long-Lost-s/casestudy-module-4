package org.example.casestudymodule4.controllers;

import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.payload.request.FoodPriceUpdateRequest;
import org.example.casestudymodule4.service.food.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('SELLER') or hasRole('ADMIN')")
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('SELLER') or hasRole('ADMIN')")
    public Food getFoodById(@PathVariable Long id) {
        return foodService.getFoodById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('SELLER') or hasRole('ADMIN')")
    public Food createFood(@RequestBody Food food) {
        return foodService.saveFood(food);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SELLER') or hasRole('ADMIN')")
    public Food updateFood(@PathVariable Long id, @RequestBody Food foodDetails) {
        return foodService.updateFood(id, foodDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SELLER') or hasRole('ADMIN')")
    public void deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('USER') or hasRole('SELLER') or hasRole('ADMIN')")
    public List<Food> searchFoodsByName(@RequestParam String name) {
        return foodService.searchFoodsByName(name);
    }

    @PutMapping("/{id}/prices")
    @PreAuthorize("hasRole('SELLER') or hasRole('ADMIN')")
    public Food updateFoodPrices(@PathVariable Long id, @RequestBody FoodPriceUpdateRequest priceUpdateRequest) {
        return foodService.updateFoodPrices(id, priceUpdateRequest);
    }

    @GetMapping("/homepage-offers") // ✅ Endpoint mới cho trang chủ, tên endpoint có thể tùy chỉnh
    @ResponseBody // ✅ Quan trọng: Thêm @ResponseBody để trả về dữ liệu trực tiếp
    public List<Food> getHomepageOffers() {
        // Logic để lấy 9 món ăn ưu đãi (featured, special offer, hoặc logic ưu đãi khác)
        // Ví dụ: Lấy 9 món ăn featured
        return foodService.findTop9FeaturedFoods(); // Giả sử bạn có method này trong FoodService
    }
}