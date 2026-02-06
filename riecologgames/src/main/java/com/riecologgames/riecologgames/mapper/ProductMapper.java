package com.riecologgames.riecologgames.mapper;
import org.springframework.stereotype.Component;
import com.riecologgames.riecologgames.domainmodel.Product;
import com.riecologgames.riecologgames.dto.ProductDTO;
import com.riecologgames.riecologgames.dto.InStoreProductDTO;

@Component 
public class ProductMapper {



    public ProductDTO toDTO(Product product) {
        if (product == null) {
            return null;
        }
        if(product.getUser() == null){
        return new ProductDTO(
            product.getId(),
            product.getGame().getId(),
            product.getStore().getId(),
            null
        );
        } 
        else {
        return new ProductDTO(
            product.getId(),
            product.getGame().getId(),
            product.getStore().getId(),
            product.getUser().getId()
        );
        }
      
    }
    

    
    public Product toEntity(ProductDTO dto) {
    Product p = new Product();
    return p;
    }

    public Product toEntity(InStoreProductDTO dto) {
    Product p = new Product();
    return p;
    }




    
}
