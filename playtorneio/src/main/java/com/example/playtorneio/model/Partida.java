package com.example.playtorneio.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "partidas")
@Data
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "competicao_id", nullable = false)
    @JsonBackReference("competicao-partidas")
    private Competicao competicao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "time_casa_id")
    private Time timeCasa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "time_visitante_id")
    private Time timeVisitante;

    private Integer placarCasa;
    private Integer placarVisitante;
    private boolean finalizada = false;
    private Integer rodada;

    @OneToMany(mappedBy = "partida", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("partida-eventos")
    private List<Evento> eventos = new ArrayList<>();
}