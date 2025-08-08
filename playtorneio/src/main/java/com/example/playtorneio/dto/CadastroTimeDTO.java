package com.example.playtorneio.dto;

import lombok.Data;
import java.util.List;

@Data
public class CadastroTimeDTO {
    private String nome;
    private String descricao;
    private Long competicaoId;
    private List<JogadorDTO> jogadores;
}