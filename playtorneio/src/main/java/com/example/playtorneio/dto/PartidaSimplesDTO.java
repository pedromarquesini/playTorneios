package com.example.playtorneio.dto;
import lombok.Data;
@Data
public class PartidaSimplesDTO {
    private Long id;
    private String timeCasaNome;
    private String timeVisitanteNome;
    private Integer placarCasa;
    private Integer placarVisitante;
    private boolean finalizada;
    private Integer rodada;
}