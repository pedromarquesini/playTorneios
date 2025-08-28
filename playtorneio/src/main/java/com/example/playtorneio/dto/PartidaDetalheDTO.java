package com.example.playtorneio.dto;

import lombok.Data;
import java.util.List;

@Data
public class PartidaDetalheDTO {
    private Long id;
    private Integer rodada;
    private boolean finalizada;
    private Integer placarCasa;
    private Integer placarVisitante;
    private CompeticaoSimplesDTO competicao;
    private TimeDetalheDTO timeCasa;
    private TimeDetalheDTO timeVisitante;
    private List<EventoDTO> eventos;
}