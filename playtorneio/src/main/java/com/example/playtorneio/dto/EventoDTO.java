package com.example.playtorneio.dto;

import com.example.playtorneio.model.TipoEvento;
import lombok.Data;

@Data
public class EventoDTO {
    private Long id;
    private TipoEvento tipo;
    private JogadorSimplesDTO jogador;
    private TimeSimplesDTO time;
}