package com.example.playtorneio.repository;

import com.example.playtorneio.model.Competicao;
import com.example.playtorneio.model.Partida;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartidaRepository extends JpaRepository<Partida, Long> {
    List<Partida> findByCompeticaoAndFinalizada(Competicao competicao, boolean finalizada);
}