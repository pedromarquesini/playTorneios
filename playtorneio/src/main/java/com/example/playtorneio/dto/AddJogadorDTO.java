package com.example.playtorneio.dto;

import lombok.Data;

@Data
public class AddJogadorDTO {
    private Long usuarioId; // Para jogadores registados
    private String nome;      // Para jogadores convidados
    private Integer numero;
}