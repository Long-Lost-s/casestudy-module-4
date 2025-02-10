package org.example.casestudymodule4.controllers;

import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.service.FoodService;
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

    @PostMapping
    @PreAuthorize("hasRole('SELLER') or hasRole('ADMIN')")
    public Food createFood(@RequestBody Food food) {
        return foodService.saveFood(food);
    }
}