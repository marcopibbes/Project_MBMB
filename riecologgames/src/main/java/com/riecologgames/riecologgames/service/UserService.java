package com.riecologgames.riecologgames.service;
import java.util.Optional;
import com.riecologgames.riecologgames.domainmodel.User;


import com.riecologgames.riecologgames.dto.RegisterRequest;
import com.riecologgames.riecologgames.dto.UserDTO;

public interface UserService {

  
    UserDTO registerCustomer(RegisterRequest request);
    UserDTO registerEmployee(RegisterRequest request);
    String login(String username, String password);
    UserDTO getUserById(Long id);
    void deleteUser(Long id);
    Optional<User> getUserByUsername(String username);

    
}
