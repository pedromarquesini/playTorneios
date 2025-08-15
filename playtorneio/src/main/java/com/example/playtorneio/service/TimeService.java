package com.example.playtorneio.service;

import com.example.playtorneio.dto.JogadorDTO;
import com.example.playtorneio.model.Jogador;
import com.example.playtorneio.model.Time;
import com.example.playtorneio.repository.TimeRepository;
import com.example.playtorneio.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TimeService {
    private final TimeRepository timeRepository;
    private final UsuarioRepository usuarioRepository;

    public TimeService(TimeRepository timeRepository, UsuarioRepository usuarioRepository) {
        this.timeRepository = timeRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Time buscarPorId(Long id) {
        return timeRepository.findById(id).orElseThrow(() -> new RuntimeException("Time não encontrado!"));
    }

    @Transactional
    public Time adicionarJogadorConvidado(Long timeId, JogadorDTO dto) {
        Time time = buscarPorId(timeId);
        if (dto.getNome() == null || dto.getNome().isBlank()) {
            throw new IllegalArgumentException("O nome do jogador é obrigatório.");
        }

        Jogador jogador = new Jogador();
        jogador.setNome(dto.getNome());
        jogador.setNumero(dto.getNumero());
        jogador.setTime(time);
        
        time.getJogadores().add(jogador);
        return timeRepository.save(time);
    }
}