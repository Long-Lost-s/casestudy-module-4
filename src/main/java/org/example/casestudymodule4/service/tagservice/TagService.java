package org.example.casestudymodule4.service.tagservice;

import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.model.FoodTag;
import org.example.casestudymodule4.model.Tag;
import org.example.casestudymodule4.repository.FoodTagRepository;
import org.example.casestudymodule4.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private FoodTagRepository foodTagRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Tag createTag(String name) {
        if (tagRepository.existsByName(name)) {
            throw new RuntimeException("Tag already exists");
        }

        Tag tag = new Tag();
        tag.setName(name);
        tag.setSlug(generateSlug(name));
        tag.setAddCount(0);
        tag.setViewCount(0);

        return tagRepository.save(tag);
    }

    public List<Food> getFoodsByTagName(String tagName) {
        Optional<Tag> optionalTag = tagRepository.findByName(tagName);

        if (optionalTag.isEmpty()) {
            throw new RuntimeException("Tag not found: " + tagName);
        }

        Tag tag = optionalTag.get();

        List<FoodTag> foodTags = foodTagRepository.findByTag(tag);
        return foodTags.stream()
                .map(FoodTag::getFood)
                .collect(Collectors.toList());
    }


    private String generateSlug(String name) {
        return name.toLowerCase().replaceAll("\\s+", "-");  // Converts "Italian Food" → "italian-food"
    }
}
