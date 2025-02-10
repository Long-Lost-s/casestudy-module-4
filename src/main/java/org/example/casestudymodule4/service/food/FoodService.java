package org.example.casestudymodule4.service.food;

import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.model.ServiceFee;
import org.example.casestudymodule4.payload.request.FoodPriceUpdateRequest;
import org.example.casestudymodule4.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class FoodService {
    @Autowired
    private FoodRepository foodRepository;

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food saveFood(Food food) {
        return foodRepository.save(food);
    }

    public Food updateFood(Long id, Food foodDetails) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        if (optionalFood.isPresent()) {
            Food food = optionalFood.get();
            food.setName(foodDetails.getName());
            food.setAddress(foodDetails.getAddress());
            food.setImageUrl(foodDetails.getImageUrl());
            food.setOpenTime(foodDetails.getOpenTime());
            food.setCloseTime(foodDetails.getCloseTime());
            food.setNotes(foodDetails.getNotes());
            food.setPrice(foodDetails.getPrice());
            food.setDiscountPrice(foodDetails.getDiscountPrice());
            food.setServiceFee(foodDetails.getServiceFee());
            food.setPreparationTime(foodDetails.getPreparationTime());
            food.setDiscountCode(foodDetails.getDiscountCode());
            food.setDiscountUsageCount(foodDetails.getDiscountUsageCount());
            food.setViews(foodDetails.getViews());
            food.setOrderCount(foodDetails.getOrderCount());
            food.setFeatured(foodDetails.isFeatured());
            food.setSpecialOffer(foodDetails.isSpecialOffer());
            food.setRestaurantName(foodDetails.getRestaurantName());
            food.setCategory(foodDetails.getCategory());
            return foodRepository.save(food);
        } else {
            throw new RuntimeException("Food not found with id " + id);
        }
    }

    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }

    public List<Food> searchFoodsByName(String name) {
        return foodRepository.findByNameContaining(name);
    }

    public Food updateFoodPrices(Long id, FoodPriceUpdateRequest priceUpdateRequest) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        if (optionalFood.isPresent()) {
            Food food = optionalFood.get();
            food.setDiscountPrice(BigDecimal.valueOf(priceUpdateRequest.getDiscountPrice()));
            food.setPrice(BigDecimal.valueOf(priceUpdateRequest.getOriginalPrice()));
            food.setServiceFee(new ServiceFee());
            food.getServiceFee().setAmount(BigDecimal.valueOf(priceUpdateRequest.getServiceFee()));
            food.setServiceFeeExplanation(priceUpdateRequest.getServiceFeeExplanation());
            return foodRepository.save(food);
        } else {
            throw new RuntimeException("Food not found with id " + id);
        }
    }

    public Food getFoodById(Long id) {
        return foodRepository.findById(id).orElseThrow(() -> new RuntimeException("Food not found with id " + id));
    }
}