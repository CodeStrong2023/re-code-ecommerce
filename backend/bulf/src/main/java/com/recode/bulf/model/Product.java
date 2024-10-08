package com.recode.bulf.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
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

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "gender_id", nullable = false)
    private Gender gender; // Relación con Gender

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category; // Relación con Category

    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategory subCategory; // Relación con Subcategory

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
    private Date date;

}