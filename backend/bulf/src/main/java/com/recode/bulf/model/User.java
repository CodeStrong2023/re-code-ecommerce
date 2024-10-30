package com.recode.bulf.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column()
    private boolean isAdmin = false;

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Token> tokens;

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Purchase> purchases = new ArrayList<>();
    
}
