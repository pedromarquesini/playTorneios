package com.example.playtorneio.controller;

import com.example.playtorneio.dto.EstatisticasJogadorDTO;
import com.example.playtorneio.dto.JogadorPerfilDTO;
import com.example.playtorneio.mapper.EntityMapper;
import com.example.playtorneio.model.Jogador;
import com.example.playtorneio.service.JogadorService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/jogadores")
public class JogadorController {
    private final JogadorService jogadorService;
    private final EntityMapper mapper;

    public JogadorController(JogadorService jogadorService, EntityMapper mapper) {
        this.jogadorService = jogadorService;
        this.mapper = mapper;
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<JogadorPerfilDTO> buscarJogadorPorId(@PathVariable Long id) {
        Jogador jogador = jogadorService.buscarPorId(id);
        return ResponseEntity.ok(mapper.toJogadorPerfilDTO(jogador));
    }
    
    @GetMapping("/{id}/estatisticas")
    @Transactional(readOnly = true)
    public ResponseEntity<EstatisticasJogadorDTO> getEstatisticas(@PathVariable Long id) {
        return ResponseEntity.ok(jogadorService.calcularEstatisticas(id));
    }

    @PutMapping("/{jogadorId}/vincular/{usuarioId}")
    @Transactional
    public ResponseEntity<JogadorPerfilDTO> vincularUsuario(@PathVariable Long jogadorId, @PathVariable Long usuarioId) {
        Jogador jogadorVinculado = jogadorService.vincularUsuario(jogadorId, usuarioId);
        return ResponseEntity.ok(mapper.toJogadorPerfilDTO(jogadorVinculado));
    }
}