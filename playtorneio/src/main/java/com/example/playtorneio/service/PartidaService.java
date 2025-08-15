package com.example.playtorneio.service;

import com.example.playtorneio.dto.AdicionarEventoDTO;
import com.example.playtorneio.model.*;
import com.example.playtorneio.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PartidaService {
    private final PartidaRepository partidaRepository;
    private final JogadorRepository jogadorRepository;
    private final TimeRepository timeRepository;
    private final EventoRepository eventoRepository;

    public Partida buscarPorId(Long id) {
        return partidaRepository.findById(id).orElseThrow(() -> new RuntimeException("Partida não encontrada!"));
    }

    @Transactional
    public void registrarEvento(AdicionarEventoDTO dto) {
        Partida partida = buscarPorId(dto.getPartidaId());
        Jogador jogador = jogadorRepository.findById(dto.getJogadorId()).orElseThrow(() -> new RuntimeException("Jogador não encontrado!"));
        Time time = timeRepository.findById(dto.getTimeId()).orElseThrow(() -> new RuntimeException("Time não encontrado!"));

        Evento evento = new Evento();
        evento.setPartida(partida);
        evento.setJogador(jogador);
        evento.setTime(time);
        evento.setTipo(dto.getTipo());

        eventoRepository.save(evento);
        atualizarPlacarDaPartida(partida);
    }
    
    @Transactional
    public Partida finalizarPartida(Long idPartida) {
        Partida partida = buscarPorId(idPartida);
        partida.setFinalizada(true);
        atualizarPlacarDaPartida(partida);
        return partidaRepository.save(partida);
    }

    private void atualizarPlacarDaPartida(Partida partida) {
        long placarCasa = partida.getEventos().stream()
                .filter(e -> e.getTipo() == TipoEvento.GOL && e.getTime().getId().equals(partida.getTimeCasa().getId()))
                .count();
        long placarVisitante = partida.getEventos().stream()
                .filter(e -> e.getTipo() == TipoEvento.GOL && e.getTime().getId().equals(partida.getTimeVisitante().getId()))
                .count();
        partida.setPlacarCasa((int) placarCasa);
        partida.setPlacarVisitante((int) placarVisitante);
        partidaRepository.save(partida);
    }
}