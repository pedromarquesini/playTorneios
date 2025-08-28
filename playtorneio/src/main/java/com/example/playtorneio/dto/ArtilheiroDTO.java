package com.example.playtorneio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ArtilheiroDTO {
    private String nomeJogador;
    private String nomeTime;
    private long gols;
}
