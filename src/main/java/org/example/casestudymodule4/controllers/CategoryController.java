package org.example.casestudymodule4.controllers;

import org.example.casestudymodule4.model.Category;
import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.service.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/{categoryId}/foods")
    public ResponseEntity<List<Food>> getFoodsByCategoryId(@PathVariable Long categoryId) {
        List<Food> foods = categoryService.getFoodsByCategoryId(categoryId);
        return ResponseEntity.ok(foods);
    }

    // THÊM ENDPOINT NÀY ĐỂ LẤY THÔNG TIN CATEGORY THEO ID
    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long categoryId) {
        Category category = categoryService.findById(categoryId); // Giả sử bạn có method findById trong CategoryService
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.notFound().build(); // Trả về 404 Not Found nếu không tìm thấy category
        }
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        return new ResponseEntity<>(categoryService.save(category), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return new ResponseEntity<>(categoryService.updateCategory(id, category), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategoryById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    @GetMapping("/page")
    public ResponseEntity<Page<Category>> getCategoriesWithPagination(@RequestParam int page) {
        return new ResponseEntity<>(categoryService.getCategoriesWithPagination(page, 50), HttpStatus.OK);
    }
}