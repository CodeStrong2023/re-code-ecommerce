package com.recode.bulf.controller;

import com.recode.bulf.model.Category;
import com.recode.bulf.model.Gender;
import com.recode.bulf.model.Product;
import com.recode.bulf.model.Subcategory;
import com.recode.bulf.service.AdminCreateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth/create")
@RequiredArgsConstructor
public class AdminCreateController {
    @Autowired
    private final AdminCreateService adminService;

    @PostMapping("/gender")
    public ResponseEntity<Gender> createGender(@RequestBody Gender gender) {
        Gender createdGender = adminService.createGender(gender);
        return ResponseEntity.ok(createdGender);
    }

    @PostMapping("/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createCategory = adminService.createCategory(category);
        return ResponseEntity.ok(createCategory);
    }

    @PostMapping("/subcategory")
    public ResponseEntity<Subcategory> createSubcategory(@RequestBody Subcategory subcategory) {
        Subcategory createSubcategory = adminService.createSubcategory(subcategory);
        return ResponseEntity.ok(createSubcategory);
    }

    @PostMapping("/product")
    public ResponseEntity<Void> createProduct(@Valid @RequestBody Product product) {
        adminService.createProduct(product);
        return ResponseEntity.status(201).build(); // 201 Created
    }
}
