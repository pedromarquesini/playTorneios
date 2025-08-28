package com.example.playtorneio.dto;

import lombok.Data;

@Data
public class JogadorPerfilDTO {
    private Long id;
    private String nome;
    private Integer numero;
    private TimeSimplesDTO time;
    private UsuarioSimplesDTO usuario;
}