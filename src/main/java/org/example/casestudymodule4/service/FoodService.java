package org.example.casestudymodule4.service;

import jakarta.transaction.Transactional;
import org.example.casestudymodule4.exception.ResourceNotFoundException;
import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class FoodService implements IGenericService<Food, Long> {
    @Autowired
    private FoodRepository foodRepository;

    @Override
    public List<Food> getAll() {
        return foodRepository.findAll();
    }

    @Override
    public Food getById(Long id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found for this id :: " + id));
    }

    @Override
    @Transactional
    public Food create(Food food) {
        food.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        food.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return foodRepository.save(food);
    }

    @Override
    @Transactional
    public Food update(Long id, Food foodDetails) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found for this id :: " + id));

        food.setName(foodDetails.getName());
        food.setDescription(foodDetails.getDescription());
        food.setPrice(foodDetails.getPrice());
        food.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return foodRepository.save(food);
    }

    @Override
    public void delete(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found for this id :: " + id));
        foodRepository.delete(food);
    }

    public List<Food> searchFoodsByName(String name) {
        return foodRepository.findByNameContainingIgnoreCase(name);
    }
}