package com.example.playtorneio.controller;

import com.example.playtorneio.dto.ArtilheiroDTO;
import com.example.playtorneio.service.EstatisticasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estatisticas")
public class EstatisticasController {

    private final EstatisticasService estatisticasService;

    public EstatisticasController(EstatisticasService estatisticasService) {
        this.estatisticasService = estatisticasService;
    }

    @GetMapping("/competicao/{id}/artilharia")
    public ResponseEntity<List<ArtilheiroDTO>> getArtilharia(@PathVariable Long id) {
        return ResponseEntity.ok(estatisticasService.getArtilharia(id));
    }
}