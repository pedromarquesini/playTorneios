package com.example.playtorneio.service;

import com.example.playtorneio.model.Competicao;
import com.example.playtorneio.model.Partida;
import com.example.playtorneio.model.Time;
import com.example.playtorneio.repository.CompeticaoRepository;
import com.example.playtorneio.repository.PartidaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PartidaService {

    private final CompeticaoRepository competicaoRepository;
    private final PartidaRepository partidaRepository;

    public PartidaService(CompeticaoRepository competicaoRepository, PartidaRepository partidaRepository) {
        this.competicaoRepository = competicaoRepository;
        this.partidaRepository = partidaRepository;
    }

    @Transactional
    public void gerarPartidasPontosCorridos(Long idCompeticao) {
        Competicao competicao = competicaoRepository.findById(idCompeticao)
                .orElseThrow(() -> new RuntimeException("Competição não encontrada!"));

        List<Time> times = new ArrayList<>(competicao.getTimes());

        if (times.size() < 2) {
            throw new IllegalStateException("É necessário ter pelo menos 2 times na competição para gerar partidas.");
        }
        if (!competicao.getPartidas().isEmpty()) {
            throw new IllegalStateException("As partidas para esta competição já foram geradas.");
        }

        // Adiciona um time "fantasma" se o número de times for ímpar
        if (times.size() % 2 != 0) {
            times.add(null); // Time nulo representa a folga
        }

        int numRodadas = times.size() - 1;
        int jogosPorRodada = times.size() / 2;
        List<Partida> partidasParaSalvar = new ArrayList<>();

        for (int i = 0; i < numRodadas; i++) {
            for (int j = 0; j < jogosPorRodada; j++) {
                Time timeCasa = times.get(j);
                Time timeVisitante = times.get(times.size() - 1 - j);

                // Se nenhum dos times for o "fantasma", cria a partida
                if (timeCasa != null && timeVisitante != null) {
                    Partida partida = new Partida();
                    partida.setCompeticao(competicao);
                    partida.setRodada(i + 1);
                    // Alterna mando de campo entre as rodadas
                    if (i % 2 == 0) {
                         partida.setTimeCasa(timeCasa);
                         partida.setTimeVisitante(timeVisitante);
                    } else {
                         partida.setTimeCasa(timeVisitante);
                         partida.setTimeVisitante(timeCasa);
                    }
                    partida.setFinalizada(false);
                    partidasParaSalvar.add(partida);
                }
            }
            Time ultimoTime = times.remove(times.size() - 1);
            times.add(1, ultimoTime);
        }
        partidaRepository.saveAll(partidasParaSalvar);
    }

    @Transactional
    public Partida atualizarPlacar(Long idPartida, Integer placarCasa, Integer placarVisitante) {
        Partida partida = partidaRepository.findById(idPartida)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada!"));

        partida.setPlacarCasa(placarCasa);
        partida.setPlacarVisitante(placarVisitante);
        partida.setFinalizada(true);

        return partidaRepository.save(partida);
    }
}