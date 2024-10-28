package com.recode.bulf.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "gender_id", nullable = false)
    private long genderId;


    @Column(name = "category_id", nullable = false)
    private long categoryId;

    @Column(name = "subcategory_id")
    private long subcategoryId;
    @Column
    private String mainImage;

    @ElementCollection
    private List<String> images;

    @Column
    private String description;

    @Column
    private float price;

    @Column
    private float stock;

    @Column
    private LocalDateTime date;

    public void purchase() {
        stock--;
    }
}
