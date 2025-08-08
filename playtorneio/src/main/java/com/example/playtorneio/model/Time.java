package com.example.playtorneio.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "times")
@Getter
@Setter
public class Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private String logo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "competicao_id", nullable = false)
    @JsonBackReference
    private Competicao competicao;

    @OneToMany(mappedBy = "time", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Jogador> jogadores = new ArrayList<>();

}