package com.recode.bulf.dto;

public record ProductCard(
        long id,
        String name,
        String mainImage,
        String description,
        float price
) {
}
