package org.example.casestudymodule4.repository;

import org.example.casestudymodule4.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByNameContaining(String name);

    List<Food> findByCategoryId(Long categoryId);

}
