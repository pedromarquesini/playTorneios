package com.example.playtorneio.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CompeticaoResponseDTO {
    private Long id;
    private String nome;
    private String descricao;
    private String dataInicio;
    private String dataTermino;
    private String publica;
    private String modalidade;
    private String numeroTimes;

    public CompeticaoResponseDTO(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }
}
