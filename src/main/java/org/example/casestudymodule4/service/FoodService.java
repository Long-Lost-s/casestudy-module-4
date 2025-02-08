package org.example.casestudymodule4.service;

import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FoodService extends GenericServiceImpl<Food, Long> {

    @Autowired
    private FoodRepository foodRepository;

    @Transactional
    public Food create(Food food) {
        return foodRepository.save(food);
    }

    @Override
    public Food update(Long id, Food foodDetails) {
        Food food = getById(id);

        food.setName(foodDetails.getName());
        food.setAddress(foodDetails.getAddress());
        food.setImageUrl(foodDetails.getImageUrl());
        food.setOpenTime(foodDetails.getOpenTime());
        food.setCloseTime(foodDetails.getCloseTime());
        food.setNotes(foodDetails.getNotes());
        food.setPrice(foodDetails.getPrice());
        food.setDiscountPrice(foodDetails.getDiscountPrice());
        food.setServiceFeeId(foodDetails.getServiceFeeId());
        food.setPreparationTime(foodDetails.getPreparationTime());
        food.setDiscountCode(foodDetails.getDiscountCode());
        food.setDiscountUsageCount(foodDetails.getDiscountUsageCount());
        food.setViews(foodDetails.getViews());
        food.setOrderCount(foodDetails.getOrderCount());
        food.setFeatured(foodDetails.getFeatured());
        food.setSpecialOffer(foodDetails.getSpecialOffer());
        food.setRestaurantName(foodDetails.getRestaurantName());
        food.setCategoryId(foodDetails.getCategoryId());

        return foodRepository.save(food);
    }

    public List<Food> searchFoodsByName(String name) {
        return foodRepository.findByNameContainingIgnoreCase(name);
    }
}
