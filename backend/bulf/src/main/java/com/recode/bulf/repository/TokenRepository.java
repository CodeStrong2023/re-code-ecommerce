package com.recode.bulf.repository;

import com.recode.bulf.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {


    @Query("SELECT t FROM Token t WHERE t.user.id = :userId AND t.isRevoked = false AND t.isExpired = false")
    List<Token> findAllValidTokenByUser(@Param("userId") Integer userId);

    Optional<Token> findByToken(String token);
}