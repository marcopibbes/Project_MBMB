package com.riecologgames.riecologgames.service.impl;
import java.util.List;

import org.springframework.stereotype.Service;
import com.riecologgames.riecologgames.domainmodel.User;

import com.riecologgames.riecologgames.dto.ProductDTO;
import com.riecologgames.riecologgames.dto.ProductWithGameDetailsDTO;
import com.riecologgames.riecologgames.mapper.ProductMapper;
import com.riecologgames.riecologgames.repository.GameRepository;
import com.riecologgames.riecologgames.repository.ProductRepository;
import com.riecologgames.riecologgames.service.ProductService;
import com.riecologgames.riecologgames.domainmodel.Product;
import com.riecologgames.riecologgames.repository.StoreRepository;
import com.riecologgames.riecologgames.repository.UserRepository;
import com.riecologgames.riecologgames.dto.InStoreProductDTO;
import com.riecologgames.riecologgames.domainmodel.Store;

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

    @Override
    public void arrivedProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        product.setArrived(true);
        productRepository.save(product);        
    }

    @Override
    public void soldProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        product.setSold(true);
        productRepository.save(product);
    }


    @Override
    public void giveCashback(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " +
                        id));
        if (product.isSold()) {
            product.setSold(false);
            productRepository.save(product);
        } else {
            throw new RuntimeException("Product with id: " + id + " is not sold, cashback cannot be given.");
        }
    }


    @Override
    public ProductDTO reserveProduct(ProductDTO productDTO) {
        Product product = productMapper.toEntity(productDTO);
        product.setGame(gameRepository.findById(productDTO.gameID())
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + productDTO.gameID())));
        product.setStore(storeRepository.findById(productDTO.storeID())
                .orElseThrow(() -> new RuntimeException("Store not found with id: " + productDTO.storeID())));
        product.setUser(userRepository.findById(productDTO.userID())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + productDTO.userID())));
        Product savedProduct = productRepository.save(product);

        return productMapper.toDTO(savedProduct);

    }

    @Override
    public List<ProductWithGameDetailsDTO> getOrdersByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return productRepository.findByUser(user).stream()
                .map(productMapper::toProductWithGameDetailsDTO)
                .toList();
    }

    @Override
    public List<ProductWithGameDetailsDTO> getAllProductsWithGameDetails() {
        return productRepository.findAll().stream()
                .map(productMapper::toProductWithGameDetailsDTO)
                .toList();
    }

    @Override
    public void requestProduct(Long id, int quantity, Long storeId) {
        // Verifica che il gioco esista (supponendo che 'id' sia l'ID del Game)
        var game = gameRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));

        // Crea il numero di prodotti richiesto
        for (int i = 0; i < quantity; i++) {
            Product newProduct = new Product();
            newProduct.setGame(game);
            newProduct.setArrived(false); // È stato richiesto, non è ancora arrivato
            newProduct.setSold(false);
            Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found with id: " + storeId));
            newProduct.setStore(store); 
            
            productRepository.save(newProduct);
        }
    }


}

