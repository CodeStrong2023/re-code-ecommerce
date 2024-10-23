package com.recode.bulf.controller;

import com.recode.bulf.model.Category;
import com.recode.bulf.model.Gender;
import com.recode.bulf.model.Product;
import com.recode.bulf.model.Subcategory;
import com.recode.bulf.service.AdminService;
import com.recode.bulf.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/admin")
@RequiredArgsConstructor
public class AdminCreateController {
    @Autowired
    private final AdminService adminService;
    @Autowired
    private final ProductService productService;

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
        productService.createProduct(product);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/product")
    public ResponseEntity<Page<Product>> getPagedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        Page<Product> products = productService.getPagedProducts(page, size);
        return ResponseEntity.ok(products);
    }
    @DeleteMapping("/product/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        boolean isDeleted = productService.deleteProductById(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product updatedProduct) {

        Product product = productService.updateProduct(id, updatedProduct);

        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
