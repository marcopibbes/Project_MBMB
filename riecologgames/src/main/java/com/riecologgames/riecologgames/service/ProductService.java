package com.riecologgames.riecologgames.service;
import com.riecologgames.riecologgames.dto.InStoreProductDTO;

import com.riecologgames.riecologgames.dto.ProductDTO;

public interface ProductService {

    ProductDTO createProduct(InStoreProductDTO productDTO);
    void deleteProduct(Long id);


}
