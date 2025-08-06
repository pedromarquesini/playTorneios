package com.example.playtorneio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CompeticaoDTO {

    @NotBlank
    private String nome;

    @NotBlank
    private String modalidade;

    private String descricao;
    private Boolean publica;
    private Integer numeroTimes;
    private String formato;
    private Boolean idaVolta;
    private LocalDate dataInicio;

    private LocalDate dataTermino;

    private List<String> criteriosDesempate;

}
