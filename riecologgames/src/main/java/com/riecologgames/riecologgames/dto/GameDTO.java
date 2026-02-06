package com.riecologgames.riecologgames.dto;

import java.math.BigDecimal;

public record GameDTO(Long id, String title, String genre, String platform, BigDecimal price) { 
    
}
