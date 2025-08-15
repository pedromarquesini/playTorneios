package com.example.playtorneio.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class CompeticaoDTO {
    private Long id;
    private List<TimeSimplesDTO> times;
    private List<PartidaSimplesDTO> partidas;

    private String nome;
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