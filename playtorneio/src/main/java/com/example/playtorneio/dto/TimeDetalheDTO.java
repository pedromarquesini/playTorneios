package com.example.playtorneio.dto;

import lombok.Data;
import java.util.List;

@Data
public class TimeDetalheDTO {
    private Long id;
    private String nome;
    private List<JogadorSimplesDTO> jogadores;
}