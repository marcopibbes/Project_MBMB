package com.riecologgames.riecologgames.service;
import java.util.List;

import com.riecologgames.riecologgames.dto.InStoreProductDTO;
import com.riecologgames.riecologgames.dto.ProductDTO;
import com.riecologgames.riecologgames.dto.ProductWithGameDetailsDTO;

public interface ProductService {

    ProductDTO createProduct(InStoreProductDTO productDTO);
    ProductDTO reserveProduct(ProductDTO productDTO);
    void deleteProduct(Long id);
    void arrivedProduct(Long id);
    void soldProduct(Long id);
    List<ProductWithGameDetailsDTO> getAllProductsWithGameDetails();
    void giveCashback(Long id);
    List<ProductWithGameDetailsDTO> getOrdersByUser(Long userId);
    void requestProduct(Long id, int quantity, Long storeId);
}
