package com.example.playtorneio.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "partidas")
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "time_casa_id")
    private Time timeCasa;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "time_visitante_id")
    private Time timeVisitante;

    private LocalDateTime dataHora;
    
    private Integer placarCasa;
    private Integer placarVisitante;
    private boolean finalizada = false;
    private Integer rodada;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "competicao_id", nullable = false)
    private Competicao competicao;

    @OneToMany(mappedBy = "partida", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("partida-eventos")
    private List<Evento> eventos = new ArrayList<>();
}