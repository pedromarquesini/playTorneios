package com.example.playtorneio.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "competicoes")
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Competicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String modalidade;
    private String logo;
    private String descricao;
    private Boolean publica;
    private Integer numeroTimes;
    private String formato;
    private Boolean idaVolta;
    private LocalDate dataInicio;
    private LocalDate dataTermino;

    @ElementCollection
    private List<String> criteriosDesempate;

    @OneToMany(mappedBy = "competicao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Time> times = new ArrayList<>();
    
    @OneToMany(mappedBy = "competicao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Partida> partidas = new ArrayList<>();
}