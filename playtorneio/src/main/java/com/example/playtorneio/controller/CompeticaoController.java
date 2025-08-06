package com.example.playtorneio.controller;

import com.example.playtorneio.dto.CompeticaoDTO;
import com.example.playtorneio.model.Competicao;
import com.example.playtorneio.service.CompeticaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/competicoes")
@RequiredArgsConstructor
public class CompeticaoController {
    private final CompeticaoService service;

    @PostMapping
    public ResponseEntity<?> criarCompeticao(@RequestBody @Valid CompeticaoDTO dto) {
        Competicao salva = service.salvar(dto);
        return ResponseEntity.ok(salva);
    }
}
