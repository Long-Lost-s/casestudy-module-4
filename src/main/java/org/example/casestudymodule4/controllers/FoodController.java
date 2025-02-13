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
    public Food getFoodById(@PathVariable Long id) {
        System.out.println("Fetching food with ID: " + id);
        Food food = foodService.getFoodById(id);
        if (food == null) {
            System.out.println("Food not found with ID: " + id);
        }
        return food;
    }

    @GetMapping("/food")
    public String getFoodPage() {
        return "food/food";
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

}