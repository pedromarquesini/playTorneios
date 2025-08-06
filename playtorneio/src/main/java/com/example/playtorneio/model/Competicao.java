package com.example.playtorneio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "competicoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Competicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String modalidade;

    private String logo; // Caminho para o arquivo salvo

    private String descricao;

    private Boolean publica;

    private Integer numeroTimes;

    private String formato;

    private Boolean idaVolta;

    private LocalDate dataInicio;

    private LocalDate dataTermino;

    @ElementCollection
    private List<String> criteriosDesempate;
}
