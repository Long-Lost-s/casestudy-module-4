package org.example.casestudymodule4.controller;

import org.example.casestudymodule4.model.Category;
import org.example.casestudymodule4.service.category.CategoryService;
import org.example.casestudymodule4.service.category.ICategoryService;
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
    private ICategoryService categoryService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category newCategory = categoryService.save(category);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category updatedCategory = ((CategoryService) categoryService).updateCategory(id, category);
        if (updatedCategory != null) {
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        ((CategoryService) categoryService).deleteCategoryById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    @GetMapping("/page")
    public ResponseEntity<Page<Category>> getCategoriesWithPagination(@RequestParam int page) {
        Page<Category> categories = ((CategoryService) categoryService).getCategoriesWithPagination(page, 50);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}