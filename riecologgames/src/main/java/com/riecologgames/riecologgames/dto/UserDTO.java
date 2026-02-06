package com.riecologgames.riecologgames.dto;
import com.riecologgames.riecologgames.domainmodel.Role;

public record UserDTO(Long id, String username, Role role) {}