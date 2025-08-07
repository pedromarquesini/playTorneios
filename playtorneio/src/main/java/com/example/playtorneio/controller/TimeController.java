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
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/times")
@CrossOrigin(origins = "localhost:5173")
public class TimeController {

    private final TimeRepository timeRepository;
    private final CompeticaoRepository competicaoRepository;

    public TimeController(TimeRepository timeRepository, CompeticaoRepository competicaoRepository) {
        this.timeRepository = timeRepository;
        this.competicaoRepository = competicaoRepository;
    }

    @PostMapping
    public ResponseEntity<?> criarTime(@RequestBody CadastroTimeDTO dto){
        Time time = new Time();
        time.setNome(dto.getNome());
        time.setDescricao(dto.getDescricao());

        if (dto.getCompeticaoId() != null) {
            Competicao competicao = competicaoRepository.findById(dto.getCompeticaoId())
                    .orElseThrow(() -> new RuntimeException("Competição não encontrada"));
            time.setCompeticao(competicao);
        }

        if(dto.getJogadores() !=null){
            for(JogadorDTO dtoJogador : dto.getJogadores()){
                Jogador jogador = new Jogador();
                jogador.setNome(dtoJogador.getNome());
                jogador.setNumero(dtoJogador.getNumero());
                jogador.setTime(time);
                time.getJogadores().add(jogador);
            }
        }

        timeRepository.save(time);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
