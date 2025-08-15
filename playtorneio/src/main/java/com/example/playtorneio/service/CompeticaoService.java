package com.example.playtorneio.service;

import com.example.playtorneio.dto.CompeticaoDTO;
import com.example.playtorneio.model.Competicao;
import com.example.playtorneio.model.Time;
import com.example.playtorneio.repository.CompeticaoRepository;
import com.example.playtorneio.repository.TimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CompeticaoService {
    private final CompeticaoRepository competicaoRepository;
    private final TimeRepository timeRepository;

    public Competicao salvar(CompeticaoDTO dto) {
        Competicao nova = new Competicao();
        nova.setNome(dto.getNome());
        nova.setDescricao(dto.getDescricao());
        nova.setPublica(dto.getPublica());
        nova.setNumeroTimes(dto.getNumeroTimes());
        nova.setIdaVolta(dto.getIdaVolta());
        nova.setDataInicio(dto.getDataInicio());
        nova.setDataTermino(dto.getDataTermino());
        nova.setCriteriosDesempate(dto.getCriteriosDesempate());
        return competicaoRepository.save(nova);
    }

    @Transactional
    public Time vincularTimeExistente(Long idCompeticao, Long idTime) {
        Competicao competicao = competicaoRepository.findById(idCompeticao)
            .orElseThrow(() -> new RuntimeException("Competição não encontrada"));
        Time time = timeRepository.findById(idTime)
            .orElseThrow(() -> new RuntimeException("Time não encontrado"));

        if (time.getCompeticao() != null) {
            throw new IllegalStateException("Este time já pertence a outra competição.");
        }

        time.setCompeticao(competicao);
        return timeRepository.save(time);
    }
}