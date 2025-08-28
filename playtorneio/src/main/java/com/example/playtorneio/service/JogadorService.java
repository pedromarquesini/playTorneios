package com.example.playtorneio.service;

import com.example.playtorneio.dto.EstatisticasJogadorDTO;
import com.example.playtorneio.model.*;
import com.example.playtorneio.repository.JogadorRepository;
import com.example.playtorneio.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JogadorService {

    private final JogadorRepository jogadorRepository;
    private final UsuarioRepository usuarioRepository;

    public Jogador buscarPorId(Long id) {
        return jogadorRepository.findById(id).orElseThrow(() -> new RuntimeException("Jogador não encontrado!"));
    }

    @Transactional
    public Jogador vincularUsuario(Long jogadorId, Long usuarioId) {
        Jogador jogador = buscarPorId(jogadorId);
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        if (usuario.getRole() != Role.JOGADOR) {
            throw new IllegalStateException("Apenas usuários com o papel de JOGADOR podem ser vinculados.");
        }
        if (jogador.getUsuario() != null) {
            throw new IllegalStateException("Este jogador já está vinculado a um usuário.");
        }

        jogador.setUsuario(usuario);
        return jogadorRepository.save(jogador);
    }

    @Transactional(readOnly = true)
    public EstatisticasJogadorDTO calcularEstatisticas(Long jogadorId) {
        Jogador jogador = buscarPorId(jogadorId);
        List<Evento> eventos = jogador.getEventos();

        long gols = eventos.stream().filter(e -> e.getTipo() == TipoEvento.GOL).count();
        long amarelos = eventos.stream().filter(e -> e.getTipo() == TipoEvento.CARTAO_AMARELO).count();
        long vermelhos = eventos.stream().filter(e -> e.getTipo() == TipoEvento.CARTAO_VERMELHO).count();

        EstatisticasJogadorDTO dto = new EstatisticasJogadorDTO();
        dto.setGols(gols);
        dto.setAmarelos(amarelos);
        dto.setVermelhos(vermelhos);
        return dto;
    }
}