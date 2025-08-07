package com.example.playtorneio.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CadastroTimeDTO {
    private String nome;
    private String descricao;
    private Long competicaoId;
    private List<JogadorDTO> jogadores;
}
