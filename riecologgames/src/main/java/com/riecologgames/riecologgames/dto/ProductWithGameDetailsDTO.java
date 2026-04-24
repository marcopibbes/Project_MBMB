package com.riecologgames.riecologgames.dto;

import java.math.BigDecimal;

public record ProductWithGameDetailsDTO(
    Long productId,
    String gameTitle,
    String platform,
    BigDecimal price,
    boolean isArrived,
    boolean isSold,
    Long userId
) {
}
