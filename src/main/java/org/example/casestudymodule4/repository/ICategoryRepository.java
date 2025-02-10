package org.example.casestudymodule4.repository;

import org.example.casestudymodule4.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Long> {
}
