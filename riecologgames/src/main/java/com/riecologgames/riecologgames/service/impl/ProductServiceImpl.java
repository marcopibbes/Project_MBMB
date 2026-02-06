package com.riecologgames.riecologgames.service.impl;
import org.springframework.stereotype.Service;

import com.riecologgames.riecologgames.dto.ProductDTO;
import com.riecologgames.riecologgames.mapper.ProductMapper;
import com.riecologgames.riecologgames.repository.GameRepository;
import com.riecologgames.riecologgames.repository.ProductRepository;
import com.riecologgames.riecologgames.service.ProductService;
import com.riecologgames.riecologgames.domainmodel.Product;
import com.riecologgames.riecologgames.repository.StoreRepository;
import com.riecologgames.riecologgames.repository.UserRepository;
import com.riecologgames.riecologgames.dto.InStoreProductDTO;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;
    private final ProductRepository productRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;


    public ProductServiceImpl(ProductMapper productMapper, ProductRepository productRepository, GameRepository gameRepository, UserRepository userRepository, StoreRepository storeRepository) {
        this.productMapper = productMapper;
        this.productRepository = productRepository;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
    }

    @Override
    public ProductDTO createProduct(InStoreProductDTO productDTO) {
        Product product = productMapper.toEntity(productDTO);
        product.setGame(gameRepository.findById(productDTO.gameID())
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + productDTO.gameID())));
        product.setStore(storeRepository.findById(productDTO.storeID())
                .orElseThrow(() -> new RuntimeException("Store not found with id: " + productDTO.storeID())));
        product.setUser(null);
        Product savedProduct = productRepository.save(product);

        return productMapper.toDTO(savedProduct);

    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }



}
