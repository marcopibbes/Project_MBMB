package com.riecologgames.riecologgames.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.riecologgames.riecologgames.domainmodel.Product;

public interface ProductRepository  extends JpaRepository<Product, Long> {
    

}
