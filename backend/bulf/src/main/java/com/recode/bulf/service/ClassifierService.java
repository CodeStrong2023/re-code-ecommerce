package com.recode.bulf.service;

import com.recode.bulf.model.Category;
import com.recode.bulf.model.Gender;
import com.recode.bulf.model.Subcategory;
import com.recode.bulf.repository.CategoryRepository;
import com.recode.bulf.repository.GenderRepository;
import com.recode.bulf.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ClassifierService {

    @Autowired
    private final GenderRepository genderRepository;

    @Autowired
    private final CategoryRepository categoryRepository;

    @Autowired
    private final SubcategoryRepository subcategoryRepository;

    public List<Gender> getAllGenders() {
        return genderRepository.findAll();
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Subcategory> getAllSubcategories() {
        return subcategoryRepository.findAll();
    }
}
