package com.riecologgames.riecologgames.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.riecologgames.riecologgames.dto.ProductDTO;
import com.riecologgames.riecologgames.dto.ProductWithGameDetailsDTO;
import com.riecologgames.riecologgames.service.ProductService;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.riecologgames.riecologgames.dto.InStoreProductDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody InStoreProductDTO productDTO) {
        ProductDTO savedProduct = productService.createProduct(productDTO);
        return ResponseEntity.status(201).body(savedProduct);
    }
    
    @GetMapping("/details")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<List<ProductWithGameDetailsDTO>> getAllProductsWithGameDetails() {
        List<ProductWithGameDetailsDTO> products = productService.getAllProductsWithGameDetails();
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @PutMapping("/arrived/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<String> arrivedProduct(@PathVariable Long id ) {
        productService.arrivedProduct(id);
        return ResponseEntity.ok("Product registered successfully");
    }


    @PutMapping("/sold/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<String> soldProduct(@PathVariable Long id ) {
        productService.soldProduct(id);
        return ResponseEntity.ok("Product sold successfully");
    }
} 
    

