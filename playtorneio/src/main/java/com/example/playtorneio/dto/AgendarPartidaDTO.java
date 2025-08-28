package com.example.playtorneio.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AgendarPartidaDTO {
    private LocalDate data;
    private LocalTime hora;
    private String local;
}