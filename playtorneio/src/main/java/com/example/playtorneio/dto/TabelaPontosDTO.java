package com.example.playtorneio.dto;

import lombok.Data;

@Data
public class TabelaPontosDTO {
    private String nomeTime;
    private int pontos;
    private int jogos;
    private int vitorias;
    private int empates;
    private int derrotas;
    private int golsPro;
    private int golsContra;
    private int saldoGols;
}