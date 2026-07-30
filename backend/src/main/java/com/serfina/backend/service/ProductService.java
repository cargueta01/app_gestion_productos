package com.serfina.backend.service;

import com.serfina.backend.dto.ProductRequest;
import com.serfina.backend.dto.ProductResponse;
import com.serfina.backend.exception.ResourceNotFoundException;
import com.serfina.backend.model.Product;
import com.serfina.backend.repository.ProductRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> findAll() {
        return productRepository
                .findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(ProductResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductResponse findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Producto no encontrado: " + id
                        )
                );

        return ProductResponse.from(product);
    }

    public ProductResponse create(ProductRequest request) {
        Product product = new Product(
                request.name().trim(),
                request.description().trim(),
                request.price(),
                request.stock(),
                request.productType()
        );

        return ProductResponse.from(productRepository.save(product));
    }

    public ProductResponse update(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Producto no encontrado: " + id
                        )
                );

        product.update(
                request.name().trim(),
                request.description().trim(),
                request.price(),
                request.stock(),
                request.productType()
        );

        return ProductResponse.from(productRepository.save(product));
    }

    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Producto no encontrado: " + id
            );
        }

        productRepository.deleteById(id);
    }
}