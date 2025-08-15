package com.example.playtorneio.dto;

import com.example.playtorneio.model.TipoEvento;
import lombok.Data;

@Data
public class AdicionarEventoDTO {
    private Long partidaId;
    private Long jogadorId;
    private Long timeId;
    private TipoEvento tipo;
    private String detalhe;
}