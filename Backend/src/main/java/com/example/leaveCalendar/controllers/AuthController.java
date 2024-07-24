package com.example.leaveCalendar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.leaveCalendar.dtos.JwtResponse;
import com.example.leaveCalendar.dtos.LoginDTO;
import com.example.leaveCalendar.models.CustomUserDetails;
import com.example.leaveCalendar.utils.JwtUtil;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
            
            final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getUsername());
            final String jwt = jwtUtil.generateJwtToken(userDetails);
            
            Long userId = ((CustomUserDetails) userDetails).getId();
            String userName = userDetails.getUsername();
            
            return ResponseEntity.ok(new JwtResponse(jwt, userId, userName)); // JWT, kullanıcı id ve username döndür
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    

}
