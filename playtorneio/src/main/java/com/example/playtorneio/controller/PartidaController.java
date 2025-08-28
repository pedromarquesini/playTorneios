package com.example.playtorneio.controller;

import com.example.playtorneio.dto.AdicionarEventoDTO;
import com.example.playtorneio.dto.PartidaDetalheDTO;
import com.example.playtorneio.mapper.EntityMapper;
import com.example.playtorneio.model.Partida;
import com.example.playtorneio.service.PartidaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partidas")
@RequiredArgsConstructor
public class PartidaController {
    private final PartidaService partidaService;
    private final EntityMapper mapper;

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<PartidaDetalheDTO> buscarPartidaPorId(@PathVariable Long id) {
        Partida partida = partidaService.buscarPorId(id);
        return ResponseEntity.ok(mapper.toPartidaDetalheDTO(partida));
    }

    @PostMapping("/eventos")
    public ResponseEntity<Void> registrarEvento(@RequestBody AdicionarEventoDTO dto) {
        partidaService.registrarEvento(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/finalizar")
    public ResponseEntity<PartidaDetalheDTO> finalizarPartida(@PathVariable Long id) {
        Partida partidaFinalizada = partidaService.finalizarPartida(id);
        return ResponseEntity.ok(mapper.toPartidaDetalheDTO(partidaFinalizada));
    }

    @PostMapping("/gerar/{idCompeticao}")
    @PreAuthorize("hasAuthority('ORGANIZADOR')")
    public ResponseEntity<Void> gerarPartidas(@PathVariable Long idCompeticao) {
        partidaService.gerarPartidasPontosCorridos(idCompeticao);
        return ResponseEntity.ok().build();
    }
}