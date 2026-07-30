package com.serfina.backend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stock;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_type", nullable = false, length = 30)
    private ProductType productType;

    protected Product() {
    }

    public Product(
            String name,
            String description,
            BigDecimal price,
            Integer stock,
            ProductType productType
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.productType = productType;
    }

    public void update(
            String name,
            String description,
            BigDecimal price,
            Integer stock,
            ProductType productType
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.productType = productType;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getStock() {
        return stock;
    }

    public ProductType getProductType() {
        return productType;
    }
}