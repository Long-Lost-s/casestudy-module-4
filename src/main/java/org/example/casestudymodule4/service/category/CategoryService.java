package org.example.casestudymodule4.service.category;

import org.example.casestudymodule4.model.Category;
import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.repository.FoodRepo;
import org.example.casestudymodule4.repository.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private FoodRepo foodRepo;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.orElse(null);
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Category category) {
        categoryRepository.delete(category);
    }

    @Override
    public Page<Category> getCategoriesWithPagination(int page, int size) {
        return categoryRepository.findAll(PageRequest.of(page, size));
    }

    public Category updateCategory(Long id, Category category) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            Category updatedCategory = existingCategory.get();
            updatedCategory.setName(category.getName());
            return categoryRepository.save(updatedCategory);
        }
        return null;
    }

    public List<Food> getFoodsByCategoryId(Long categoryId) {
        return foodRepo.findByCategoryId(categoryId);
    }

    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }

}
