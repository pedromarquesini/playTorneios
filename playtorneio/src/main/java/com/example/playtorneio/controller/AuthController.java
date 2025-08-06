package com.example.playtorneio.controller;

import com.example.playtorneio.dto.LoginDTO;
import com.example.playtorneio.dto.RegistroDTO;
import com.example.playtorneio.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@Valid @RequestBody RegistroDTO dto) {
        String msg = authService.registrar(dto);
        if (msg.contains("já cadastrado")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(msg);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(msg);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDTO dto) {
        if(authService.autenticar(dto)){
            return ResponseEntity.ok("Login realizado com sucesso");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login ou senha inválidos");
    }
}
