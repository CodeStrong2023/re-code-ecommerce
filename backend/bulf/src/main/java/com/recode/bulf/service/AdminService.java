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

@Service
@RequiredArgsConstructor
public class AdminService {
    @Autowired
    private final GenderRepository genderRepository;
    @Autowired
    private final CategoryRepository categoryRepository;
    @Autowired
    private final SubcategoryRepository subcategoryRepository;

    public Gender createGender(Gender gender) {
        return genderRepository.save(gender);
    }

    public Category createCategory(Category category) {
        Subcategory defaultSubcategory = new Subcategory();
        defaultSubcategory.setName("None");
        defaultSubcategory.setCategory(category);
        Category response = categoryRepository.save(category);
        subcategoryRepository.save(defaultSubcategory);
        return response;
    }

    public Subcategory createSubcategory(Subcategory subcategory) {
        return subcategoryRepository.save(subcategory);
    }
    public void deleteSubcategory(Long subcategoryId) {
        subcategoryRepository.delete(
                subcategoryRepository.findById(subcategoryId).get()
        );

    }
    public void deleteCategory(Long categoryId) {
        List<Subcategory> subcategories = subcategoryRepository.findByCategoryId(categoryId);
        for (Subcategory subcategory : subcategories) {
            subcategoryRepository.delete(subcategory);
        }
        categoryRepository.deleteById(categoryId);
    }
    public void deleteGender(Long genderId) {
        List<Category> categories = categoryRepository.findByGenderId(genderId);
        for (Category category : categories) {
            deleteCategory(category.getId());
        }
        genderRepository.deleteById(genderId);
    }

}
