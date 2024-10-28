package com.recode.bulf.controller;

import com.recode.bulf.dto.ProductCard;
import com.recode.bulf.model.Product;
import com.recode.bulf.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/product")
@RestController
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private final ProductService productService;

    @GetMapping("/item/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<ProductCard>> getPagedProducts(@RequestParam(defaultValue = "0") int page) {
        Page<ProductCard> products = productService.getPagedProducts(page);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/gender")
    public ResponseEntity<Page<ProductCard>> getPagedProductsByGender(@RequestParam(defaultValue = "0") int page, @RequestParam Long gender) {
        Page<ProductCard> products = productService.getPagedProductsByGender(page, gender);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category")
    public ResponseEntity<Page<ProductCard>> getPagedProductsByCategory(@RequestParam(defaultValue = "0") int page, @RequestParam Long category) {
        Page<ProductCard> products = productService.getPagedProductsByCategory(page, category);
        return ResponseEntity.ok(products);
    }
}
