package com.example.playtorneio.repository;

import com.example.playtorneio.dto.ArtilheiroDTO;
import com.example.playtorneio.model.Evento;
import com.example.playtorneio.model.TipoEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    @Query("SELECT new com.example.playtorneio.dto.ArtilheiroDTO(j.nome, t.nome, COUNT(e)) " +
           "FROM Evento e JOIN e.jogador j JOIN e.time t " +
           "WHERE e.partida.competicao.id = :competicaoId AND e.tipo = :tipoEvento " +
           "GROUP BY j.nome, t.nome " +
           "ORDER BY COUNT(e) DESC")
    List<ArtilheiroDTO> findArtilhariaByCompeticao(@Param("competicaoId") Long competicaoId, @Param("tipoEvento") TipoEvento tipoEvento);
}