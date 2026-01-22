package com.shop.auth.service;

import com.shop.auth.dto.JwtResponse;
import com.shop.auth.dto.LoginRequest;
import com.shop.auth.entity.User;
import com.shop.auth.repository.UserRepository;
import com.shop.auth.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    public JwtResponse login(LoginRequest dto) {
        // 1. autentificare
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.username(), dto.password())
        );

        // 2. extragem UserDetails
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        // 3. Găsim user-ul complet din baza de date pentru ID și username
        User user = userRepository.findByUsername(dto.username())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 4. generăm token cu toate datele
        String token = jwtUtils.generateToken(user.getUsername(), role);

        // 5. Returnăm obiect extins
        return new JwtResponse(token, role, user.getId(), user.getUsername());
    }
}