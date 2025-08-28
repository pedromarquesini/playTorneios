package com.example.playtorneio.controller;

import com.example.playtorneio.dto.UsuarioSimplesDTO;
import com.example.playtorneio.model.Role;
import com.example.playtorneio.model.Usuario;
import com.example.playtorneio.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/jogadores")
    public ResponseEntity<List<UsuarioSimplesDTO>> listarJogadores() {
        List<Usuario> jogadores = usuarioRepository.findByRole(Role.JOGADOR);
        // Converte a lista de entidades para uma lista de DTOs
        List<UsuarioSimplesDTO> dtos = jogadores.stream().map(usuario -> {
            UsuarioSimplesDTO dto = new UsuarioSimplesDTO();
            dto.setId(usuario.getId());
            dto.setNome(usuario.getNome());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}