

package com.riecologgames.riecologgames.security; 
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
 import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
 import org.springframework.security.crypto.password.PasswordEncoder; 
 import org.springframework.security.web.SecurityFilterChain;
  import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
   import org.springframework.context.annotation.Configuration;

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
             http .csrf(csrf -> csrf.disable()) .authorizeHttpRequests(auth -> auth // endpoint pubblici 
             .requestMatchers("/api/users/register_customer", "/api/users/login", "/api/users/whoami", "/api/games/create","/api/store/create", "/api/products/create", "/api/games").permitAll() 
             .anyRequest().authenticated() ) 
              .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); return http.build(); } }