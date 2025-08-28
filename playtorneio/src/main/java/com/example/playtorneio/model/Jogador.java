package com.example.playtorneio.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "jogadores")
@Data
public class Jogador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = true)
    @JsonBackReference("usuario-jogador")
    private Usuario usuario;

    private Integer numero;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "time_id", nullable = false)
    @JsonBackReference("time-jogadores")
    private Time time;

    @OneToMany(mappedBy = "jogador")
    private List<Evento> eventos = new ArrayList<>();
}