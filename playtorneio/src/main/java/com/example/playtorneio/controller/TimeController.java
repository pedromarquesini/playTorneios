package com.example.playtorneio.controller;

import com.example.playtorneio.dto.CadastroTimeDTO;
import com.example.playtorneio.dto.JogadorDTO;
import com.example.playtorneio.model.Competicao;
import com.example.playtorneio.model.Jogador;
import com.example.playtorneio.model.Time;
import com.example.playtorneio.repository.CompeticaoRepository;
import com.example.playtorneio.repository.TimeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/times")
public class TimeController {

    private final TimeRepository timeRepository;
    private final CompeticaoRepository competicaoRepository;

    public TimeController(TimeRepository timeRepository, CompeticaoRepository competicaoRepository) {
        this.timeRepository = timeRepository;
        this.competicaoRepository = competicaoRepository;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> criarTime(@RequestBody CadastroTimeDTO dto) {
        Time time = new Time();
        time.setNome(dto.getNome());
        time.setDescricao(dto.getDescricao());

        if (dto.getCompeticaoId() != null) {
            Competicao competicao = competicaoRepository.findById(dto.getCompeticaoId())
                    .orElseThrow(() -> new RuntimeException("Competição não encontrada"));
            time.setCompeticao(competicao);
        } else {
             throw new RuntimeException("É obrigatório associar o time a uma competição.");
        }

        if (dto.getJogadores() != null && !dto.getJogadores().isEmpty()) {
            for (JogadorDTO jogadorDTO : dto.getJogadores()) {
                if (jogadorDTO.getNome() != null && !jogadorDTO.getNome().isBlank()) {
                    Jogador jogador = new Jogador();
                    jogador.setNome(jogadorDTO.getNome());
                    jogador.setNumero(jogadorDTO.getNumero());
                    jogador.setTime(time); // Associa o jogador ao time
                    time.getJogadores().add(jogador);
                }
            }
        }

        Time timeSalvo = timeRepository.save(time);
        return ResponseEntity.status(HttpStatus.CREATED).body(timeSalvo);
    }

    @GetMapping
    public ResponseEntity<List<Time>> listarTodosOsTimes() {
        List<Time> times = timeRepository.findAll();
        return ResponseEntity.ok(times);
    }
}