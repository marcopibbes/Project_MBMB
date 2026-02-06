package com.riecologgames.riecologgames.service.impl;
import org.springframework.stereotype.Service;

import com.riecologgames.riecologgames.dto.RegisterRequest;
import com.riecologgames.riecologgames.dto.UserDTO;
import com.riecologgames.riecologgames.mapper.UserMapper;
import com.riecologgames.riecologgames.service.UserService;
import com.riecologgames.riecologgames.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.riecologgames.riecologgames.domainmodel.User;
import com.riecologgames.riecologgames.domainmodel.Role;
import java.util.Optional;
import com.riecologgames.riecologgames.security.JwtUtil;


@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil ;

    public UserServiceImpl(UserRepository userRepository,
                           UserMapper userMapper,
                           PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        }

    @Override
    public UserDTO registerCustomer(RegisterRequest request) {
        
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("Username già esistente!");
        }

        
        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password())); 
        user.setRole(Role.CUSTOMER);
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    @Override
    public UserDTO registerEmployee(RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("Username già esistente!");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password())); 
        user.setRole(Role.EMPLOYEE);
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }
    
 
    


    
@Override
public String login(String username, String password) {
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Password non valida");
    }

    return jwtUtil.generateToken(username); // restituisce token JWT
}

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDTO(user);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
                
    }

}
