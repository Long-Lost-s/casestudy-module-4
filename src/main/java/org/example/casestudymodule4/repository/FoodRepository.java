package org.example.casestudymodule4.repository;

import org.example.casestudymodule4.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
