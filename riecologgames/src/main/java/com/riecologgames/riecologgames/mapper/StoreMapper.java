package com.riecologgames.riecologgames.mapper;
import org.springframework.stereotype.Component;


import com.riecologgames.riecologgames.dto.StoreDTO;
import com.riecologgames.riecologgames.domainmodel.Store;

@Component
public class StoreMapper {

     public StoreDTO toDTO(Store store) {
        if (store == null) {
            return null;
        }
        return new StoreDTO(
            store.getId(),
            store.getName(),
            store.getAddress()
        );
    }       

    public Store toEntity(StoreDTO storeDTO) {
        if (storeDTO == null) {
            return null;
        }
        return new Store(
            storeDTO.id(),
            storeDTO.name(),
            storeDTO.address()
        );
    }
    
}
