package com.recode.bulf.controller;

import com.recode.bulf.model.Product;
import com.recode.bulf.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/product")
@RestController

public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public void createProduct(@RequestBody Product product) {
        productService.create(product);
    }

    @GetMapping("get")
    public List<Product> getAllProducts() {
        return productService.getAll();

    }
}
