package com.recode.bulf.repository;

import com.recode.bulf.model.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenderRepository extends JpaRepository<Gender, Long> {


}