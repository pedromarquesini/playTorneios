package com.example.playtorneio.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PartidaDTO {
    private Long id;
    private TimeSimplesDTO timeCasa;
    private TimeSimplesDTO timeVisitante;
    private LocalDateTime dataHora;
    private Integer placarCasa;
    private Integer placarVisitante;
    private boolean finalizada;
    private Integer rodada;
    private CompeticaoSimplesDTO competicao;
    private List<EventoDTO> eventos;
}