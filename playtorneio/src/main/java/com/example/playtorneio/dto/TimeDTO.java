package com.example.playtorneio.dto;

import lombok.Data;
import java.util.List;

@Data
public class TimeDTO {
    private Long id;
    private String nome;
    private String descricao;
    private String competicaoNome;
    private List<JogadorSimplesDTO> jogadores;
}