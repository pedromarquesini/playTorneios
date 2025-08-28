package com.example.playtorneio.service;

import com.example.playtorneio.dto.ArtilheiroDTO;
import com.example.playtorneio.repository.EventoRepository; // Crie este repositório no próximo passo
import com.example.playtorneio.model.TipoEvento;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstatisticasService {

    private final EventoRepository eventoRepository;

    public EstatisticasService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public List<ArtilheiroDTO> getArtilharia(Long idCompeticao) {
        return eventoRepository.findArtilhariaByCompeticao(idCompeticao, TipoEvento.GOL);
    }
}