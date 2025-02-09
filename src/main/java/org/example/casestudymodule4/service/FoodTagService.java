package org.example.casestudymodule4.service;

import org.example.casestudymodule4.model.FoodTag;
import org.example.casestudymodule4.model.Tag;
import org.example.casestudymodule4.repository.FoodTagRepository;
import org.example.casestudymodule4.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FoodTagService {
    @Autowired
    private FoodTagRepository foodTagRepository;

    @Autowired
    private TagRepository tagRepository;

    public List<FoodTag> getAllFoodTags() {
        return foodTagRepository.findAll();
    }

    public List<FoodTag> getFoodByTag(String tagName) {
        Optional<Tag> tag = tagRepository.findByName(tagName);
        return tag.map(foodTagRepository::findByTag).orElse(List.of());
    }
}
