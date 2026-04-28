

package com.riecologgames.riecologgames.security; 
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
 import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
 import org.springframework.security.crypto.password.PasswordEncoder; 
 import org.springframework.security.web.SecurityFilterChain;
  import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
   import org.springframework.context.annotation.Configuration;

   import java.util.List;

    @EnableMethodSecurity 
    @Configuration 
    public class SecurityConfig { 
        private final JwtFilter jwtFilter; 
        @Bean 
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder(); }
            
        public SecurityConfig(JwtFilter jwtFilter) { this.jwtFilter = jwtFilter; }

         @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(request -> {
            var corsConfig = new org.springframework.web.cors.CorsConfiguration();
            corsConfig.setAllowedOrigins(List.of("http://localhost:3000"));
            corsConfig.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
            corsConfig.setAllowedHeaders(List.of("*"));
            corsConfig.setAllowCredentials(true);
            return corsConfig;
        }))
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/users/register_customer","/api/products/arrived/**", "/api/users/login", "/api/users/whoami", "/api/games/create","/api/store/create", "/api/products/create", "/api/games","/api/products/details","/api/products/request/**").permitAll() 
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}}



