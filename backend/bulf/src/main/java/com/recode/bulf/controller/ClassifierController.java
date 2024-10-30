package com.recode.bulf.controller;

import com.recode.bulf.model.Category;
import com.recode.bulf.model.Gender;
import com.recode.bulf.model.Subcategory;
import com.recode.bulf.service.ClassifierService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class ClassifierController {
    @Autowired
    private final ClassifierService classifierService;

    @GetMapping("/genders")
    public ResponseEntity<List<Gender>> getAllGenders() {
        List<Gender> genders = classifierService.getAllGenders();
        return ResponseEntity.ok(genders);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = classifierService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/subcategories")
    public ResponseEntity<List<Subcategory>> getAllSubcategories() {
        List<Subcategory> subcategories = classifierService.getAllSubcategories();
        return ResponseEntity.ok(subcategories);
    }
}
