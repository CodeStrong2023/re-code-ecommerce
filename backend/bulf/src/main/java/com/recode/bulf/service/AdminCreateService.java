package com.recode.bulf.service;

import com.recode.bulf.model.Category;
import com.recode.bulf.model.Gender;
import com.recode.bulf.model.Product;
import com.recode.bulf.model.Subcategory;
import com.recode.bulf.repository.CategoryRepository;
import com.recode.bulf.repository.GenderRepository;
import com.recode.bulf.repository.ProductRepository;
import com.recode.bulf.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminCreateService {
    @Autowired
    private final GenderRepository genderRepository;

    @Autowired
    private final CategoryRepository categoryRepository;

    @Autowired
    private final SubcategoryRepository subcategoryRepository;
    @Autowired
    private ProductRepository productRepository;
    public Gender createGender(Gender gender) {
        return genderRepository.save(gender);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Subcategory createSubcategory(Subcategory subcategory) {
        return subcategoryRepository.save(subcategory);
    }

    public Product createProduct(Product product) {
        product.setDate(LocalDateTime.now());
        return productRepository.save(product);
    }
}
