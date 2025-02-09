package org.example.casestudymodule4.repository;

import org.example.casestudymodule4.model.FoodTag;
import org.example.casestudymodule4.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodTagRepository extends JpaRepository<FoodTag, Long> {
    List<FoodTag> findByTag(Tag tag);
}
