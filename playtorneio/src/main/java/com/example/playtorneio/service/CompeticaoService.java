package com.example.playtorneio.service;

import com.example.playtorneio.dto.CompeticaoDTO;
import com.example.playtorneio.model.Competicao;
import com.example.playtorneio.repository.CompeticaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompeticaoService {
    private final CompeticaoRepository repository;

    public Competicao salvar(CompeticaoDTO dto) {
        Competicao nova = new Competicao();
        nova.setNome(dto.getNome());
        nova.setModalidade(dto.getModalidade());
        nova.setDescricao(dto.getDescricao());
        nova.setPublica(dto.getPublica());
        nova.setNumeroTimes(dto.getNumeroTimes());
        nova.setFormato(dto.getFormato());
        nova.setIdaVolta(dto.getIdaVolta());
        nova.setDataInicio(dto.getDataInicio());
        nova.setDataTermino(dto.getDataTermino());
        nova.setCriteriosDesempate(dto.getCriteriosDesempate());

        return repository.save(nova);
    }
}
