package com.recode.bulf.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "gender_id", nullable = false)
    @JsonBackReference
    private Gender gender;
    @OneToMany(mappedBy = "category")
    private List<Subcategory> subcategories;

    @JsonCreator
    public Category(Long id) {
        this.id = id;
    }
}