package com.example.playtorneio.service;

import com.example.playtorneio.dto.TabelaPontosDTO;
import com.example.playtorneio.model.Competicao;
import com.example.playtorneio.model.Partida;
import com.example.playtorneio.model.Time;
import com.example.playtorneio.repository.CompeticaoRepository;
import com.example.playtorneio.repository.PartidaRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TabelaService {

    private final CompeticaoRepository competicaoRepository;
    private final PartidaRepository partidaRepository;

    public TabelaService(CompeticaoRepository competicaoRepository, PartidaRepository partidaRepository) {
        this.competicaoRepository = competicaoRepository;
        this.partidaRepository = partidaRepository;
    }

    public List<TabelaPontosDTO> calcularTabela(Long idCompeticao) {
        Competicao competicao = competicaoRepository.findById(idCompeticao)
            .orElseThrow(() -> new RuntimeException("Competição não encontrada!"));

        List<Partida> partidas = partidaRepository.findByCompeticaoAndFinalizada(competicao, true);
        Map<Time, TabelaPontosDTO> mapaTabela = new HashMap<>();

        for (Time time : competicao.getTimes()) {
            TabelaPontosDTO dto = new TabelaPontosDTO();
            dto.setNomeTime(time.getNome());
            mapaTabela.put(time, dto);
        }

        for (Partida partida : partidas) {
            TabelaPontosDTO dtoCasa = mapaTabela.get(partida.getTimeCasa());
            TabelaPontosDTO dtoVisitante = mapaTabela.get(partida.getTimeVisitante());

            dtoCasa.setJogos(dtoCasa.getJogos() + 1);
            dtoVisitante.setJogos(dtoVisitante.getJogos() + 1);
            dtoCasa.setGolsPro(dtoCasa.getGolsPro() + partida.getPlacarCasa());
            dtoCasa.setGolsContra(dtoCasa.getGolsContra() + partida.getPlacarVisitante());
            dtoVisitante.setGolsPro(dtoVisitante.getGolsPro() + partida.getPlacarVisitante());
            dtoVisitante.setGolsContra(dtoVisitante.getGolsContra() + partida.getPlacarCasa());

            if (partida.getPlacarCasa() > partida.getPlacarVisitante()) {
                dtoCasa.setPontos(dtoCasa.getPontos() + 3);
                dtoCasa.setVitorias(dtoCasa.getVitorias() + 1);
                dtoVisitante.setDerrotas(dtoVisitante.getDerrotas() + 1);
            } else if (partida.getPlacarVisitante() > partida.getPlacarCasa()) {
                dtoVisitante.setPontos(dtoVisitante.getPontos() + 3);
                dtoVisitante.setVitorias(dtoVisitante.getVitorias() + 1);
                dtoCasa.setDerrotas(dtoCasa.getDerrotas() + 1);
            } else {
                dtoCasa.setPontos(dtoCasa.getPontos() + 1);
                dtoVisitante.setPontos(dtoVisitante.getPontos() + 1);
                dtoCasa.setEmpates(dtoCasa.getEmpates() + 1);
                dtoVisitante.setEmpates(dtoVisitante.getEmpates() + 1);
            }
        }

        return mapaTabela.values().stream()
            .peek(dto -> dto.setSaldoGols(dto.getGolsPro() - dto.getGolsContra()))
            .sorted(Comparator.comparing(TabelaPontosDTO::getPontos).reversed()
                .thenComparing(TabelaPontosDTO::getVitorias, Comparator.reverseOrder())
                .thenComparing(TabelaPontosDTO::getSaldoGols, Comparator.reverseOrder())
                .thenComparing(TabelaPontosDTO::getGolsPro, Comparator.reverseOrder()))
            .collect(Collectors.toList());
    }
}