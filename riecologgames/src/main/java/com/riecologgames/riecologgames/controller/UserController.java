package com.riecologgames.riecologgames.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.riecologgames.riecologgames.dto.LoginRequest;
import com.riecologgames.riecologgames.dto.RegisterRequest;
import com.riecologgames.riecologgames.dto.UserDTO;
import com.riecologgames.riecologgames.service.UserService;
import com.riecologgames.riecologgames.security.JwtUtil;

import com.riecologgames.riecologgames.domainmodel.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private PasswordEncoder passwordEncoder;

    public UserController(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔹 Registrazione nuovo cliente
    @PostMapping("/register_customer")
    public ResponseEntity<UserDTO> registerCustomer(@RequestBody RegisterRequest request) {
        UserDTO savedUser = userService.registerCustomer(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/register_employee")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> registerEmployee(@RequestBody RegisterRequest request) {
        UserDTO savedUser = userService.registerEmployee(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
       
    }

   

@PostMapping("/login")
public ResponseEntity<String> login(@RequestBody LoginRequest request) {
    User user = userService.getUserByUsername(request.username())
            .orElseThrow(() -> new RuntimeException("Invalid username or password"));

    if (passwordEncoder.matches(request.password(), user.getPassword())) {
        String token = jwtUtil.generateToken(user.getUsername()); // genera JWT
        return ResponseEntity.ok(token);
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
}



    // 🔹 (Opzionale) Ottenere un utente per id
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO userDTO = userService.getUserById(id);
        return ResponseEntity.ok(userDTO);
    }

    // 🔹 (Opzionale) Eliminare un utente
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/whoami")
    public ResponseEntity<?> whoAmI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        // l'oggetto principal è il tuo User
        Object principal = auth.getPrincipal();
        return ResponseEntity.ok(principal);
    }
}
