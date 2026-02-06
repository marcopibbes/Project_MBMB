package com.riecologgames.riecologgames.service;
import com.riecologgames.riecologgames.dto.StoreDTO;

public interface StoreService {

    StoreDTO getStoreByName(String name);
    StoreDTO createStore(StoreDTO storeDTO);

    
}
