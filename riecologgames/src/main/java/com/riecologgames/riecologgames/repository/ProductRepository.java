package com.riecologgames.riecologgames.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.riecologgames.riecologgames.domainmodel.Product;
import com.riecologgames.riecologgames.domainmodel.User;
import java.util.List;

public interface ProductRepository  extends JpaRepository<Product, Long> {
    List<Product> findByUser(User user);
    List<Product> findByUserId(Long userId);
}
