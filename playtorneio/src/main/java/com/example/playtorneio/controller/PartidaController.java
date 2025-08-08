package com.example.playtorneio.controller;

import com.example.playtorneio.model.Partida;
import com.example.playtorneio.service.PartidaService;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partidas")
public class PartidaController {

    private final PartidaService partidaService;

    public PartidaController(PartidaService partidaService) {
        this.partidaService = partidaService;
    }

    @PostMapping("/gerar/{idCompeticao}")
    public ResponseEntity<Void> gerarPartidas(@PathVariable Long idCompeticao) {
        partidaService.gerarPartidasPontosCorridos(idCompeticao);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Partida> atualizarPlacar(@PathVariable Long id, @RequestBody Map<String, Integer> placar) {
        Partida partidaAtualizada = partidaService.atualizarPlacar(id, placar.get("placarCasa"), placar.get("placarVisitante"));
        return ResponseEntity.ok(partidaAtualizada);
    }
}