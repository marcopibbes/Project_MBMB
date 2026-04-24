package com.riecologgames.riecologgames.service;
import java.util.List;

import com.riecologgames.riecologgames.dto.InStoreProductDTO;
import com.riecologgames.riecologgames.dto.ProductDTO;
import com.riecologgames.riecologgames.dto.ProductWithGameDetailsDTO;

public interface ProductService {

    ProductDTO createProduct(InStoreProductDTO productDTO);
    void deleteProduct(Long id);
    void arrivedProduct(Long id);
    void soldProduct(Long id);
    List<ProductWithGameDetailsDTO> getAllProductsWithGameDetails();

}
