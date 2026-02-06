package com.riecologgames.riecologgames.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.riecologgames.riecologgames.dto.StoreDTO;

import com.riecologgames.riecologgames.service.StoreService;


@RestController
@RequestMapping("/api/store")
public class StoreController {

    private final StoreService storeService;
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StoreDTO> createStore(@RequestBody StoreDTO request) {
        StoreDTO storeDTO = storeService.createStore(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(storeDTO);
    }

}
