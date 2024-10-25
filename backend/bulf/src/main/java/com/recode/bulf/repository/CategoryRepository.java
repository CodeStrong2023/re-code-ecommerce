package com.recode.bulf.repository;

import com.recode.bulf.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByGenderId(Long genderId);
}