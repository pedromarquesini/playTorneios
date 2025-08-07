package com.example.playtorneio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "jogadores")
@Getter
@Setter
public class Jogador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private Integer numero;

    @ManyToOne
    @JoinColumn(name = "time_id")
    private Time time;


}

