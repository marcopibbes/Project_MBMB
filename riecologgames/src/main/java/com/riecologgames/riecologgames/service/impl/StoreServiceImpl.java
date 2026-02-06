package com.riecologgames.riecologgames.service.impl;
import org.springframework.stereotype.Service;

import com.riecologgames.riecologgames.dto.StoreDTO;
import com.riecologgames.riecologgames.domainmodel.Store;
import com.riecologgames.riecologgames.mapper.StoreMapper;
import com.riecologgames.riecologgames.repository.StoreRepository;
import com.riecologgames.riecologgames.service.StoreService;


@Service
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;

    
    
    public StoreServiceImpl(StoreRepository storeRepository, StoreMapper storeMapper) {
        this.storeRepository = storeRepository;
        this.storeMapper = storeMapper;
    }


    @Override
    public StoreDTO getStoreByName(String name) {
        Store store = storeRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Store not found"));
        return storeMapper.toDTO(store);
    }

    @Override
    public StoreDTO createStore(StoreDTO storeDTO) {
        Store store = storeMapper.toEntity(storeDTO);
        Store savedStore = storeRepository.save(store);
        return storeMapper.toDTO(savedStore);
    }

    
}
