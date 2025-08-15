package com.example.playtorneio.service;

import com.example.playtorneio.dto.AdicionarEventoDTO;
import com.example.playtorneio.model.*;
import com.example.playtorneio.repository.*;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PartidaService {
    private final PartidaRepository partidaRepository;
    private final JogadorRepository jogadorRepository;
    private final TimeRepository timeRepository;
    private final EventoRepository eventoRepository;
    private final CompeticaoRepository competicaoRepository;

    public Partida buscarPorId(Long id) {
        return partidaRepository.findById(id).orElseThrow(() -> new RuntimeException("Partida não encontrada!"));
    }

    @Transactional
    public void gerarPartidasPontosCorridos(Long idCompeticao) {
        Competicao competicao = competicaoRepository.findById(idCompeticao)
                .orElseThrow(() -> new RuntimeException("Competição não encontrada!"));

        List<Time> times = new ArrayList<>(competicao.getTimes());

        if (times.size() < 2) {
            throw new IllegalStateException("É necessário ter pelo menos 2 times para gerar partidas.");
        }
        if (!competicao.getPartidas().isEmpty()) {
            throw new IllegalStateException("As partidas para esta competição já foram geradas.");
        }

        if (times.size() % 2 != 0) {
            times.add(null);
        }

        int numRodadas = times.size() - 1;
        List<Partida> partidasParaSalvar = new ArrayList<>();
        List<Partida> partidasPrimeiroTurno = new ArrayList<>();

        for (int i = 0; i < numRodadas; i++) {
            for (int j = 0; j < times.size() / 2; j++) {
                Time timeCasa = times.get(j);
                Time timeVisitante = times.get(times.size() - 1 - j);

                if (timeCasa != null && timeVisitante != null) {
                    Partida partida = new Partida();
                    partida.setCompeticao(competicao);
                    partida.setRodada(i + 1);
                    partida.setTimeCasa(timeCasa);
                    partida.setTimeVisitante(timeVisitante);
                    partida.setFinalizada(false);
                    partidasPrimeiroTurno.add(partida);
                }
            }
            Time ultimoTime = times.remove(times.size() - 1);
            times.add(1, ultimoTime);
        }
        partidasParaSalvar.addAll(partidasPrimeiroTurno);

        if (competicao.getIdaVolta()) {
            partidasPrimeiroTurno.forEach(partidaIda -> {
                Partida partidaVolta = new Partida();
                partidaVolta.setCompeticao(competicao);
                partidaVolta.setRodada(partidaIda.getRodada() + numRodadas);
                partidaVolta.setTimeCasa(partidaIda.getTimeVisitante());
                partidaVolta.setTimeVisitante(partidaIda.getTimeCasa());
                partidaVolta.setFinalizada(false);
                partidasParaSalvar.add(partidaVolta);
            });
        }
        partidaRepository.saveAll(partidasParaSalvar);
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