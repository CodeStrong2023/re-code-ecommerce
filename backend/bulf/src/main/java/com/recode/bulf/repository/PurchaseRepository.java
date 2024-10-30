package com.recode.bulf.repository;

import com.recode.bulf.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    @Query("SELECT p FROM Purchase p JOIN FETCH p.user JOIN FETCH p.products WHERE p.user.id = :userId")
    List<Purchase> findPurchasesByUserId(@Param("userId") Integer userId);

    @Query("SELECT p FROM Purchase p JOIN FETCH p.user JOIN FETCH p.products")
    List<Purchase> findAllPurchases();

}
