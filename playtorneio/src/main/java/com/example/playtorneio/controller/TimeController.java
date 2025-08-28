package com.example.playtorneio.controller;

import com.example.playtorneio.dto.*;
import com.example.playtorneio.mapper.EntityMapper;
import com.example.playtorneio.model.Competicao;
import com.example.playtorneio.model.Time;
import com.example.playtorneio.repository.CompeticaoRepository;
import com.example.playtorneio.repository.TimeRepository;
import com.example.playtorneio.service.TimeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/times")
public class TimeController {

    private final TimeRepository timeRepository;
    private final CompeticaoRepository competicaoRepository;
    private final TimeService timeService;
    private final EntityMapper mapper;

    public TimeController(TimeRepository timeRepository, CompeticaoRepository competicaoRepository, TimeService timeService, EntityMapper mapper) {
        this.timeRepository = timeRepository;
        this.competicaoRepository = competicaoRepository;
        this.timeService = timeService;
        this.mapper = mapper;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<TimeDTO>> listarTodosOsTimes() {
        return ResponseEntity.ok(timeRepository.findAll().stream()
            .map(mapper::toTimeDTO).collect(Collectors.toList()));
    }

    @GetMapping("/disponiveis")
    @Transactional(readOnly = true)
    public ResponseEntity<List<TimeDTO>> listarTimesDisponiveis() {
        return ResponseEntity.ok(timeRepository.findByCompeticaoIsNull().stream()
            .map(mapper::toTimeDTO).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<TimeDTO> buscarTimePorId(@PathVariable Long id) {
        return timeRepository.findById(id)
            .map(mapper::toTimeDTO)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Time> criarTime(@RequestBody CadastroTimeDTO dto) {
        Time time = new Time();
        time.setNome(dto.getNome());
        time.setDescricao(dto.getDescricao());
        if (dto.getCompeticaoId() != null) {
            Competicao competicao = competicaoRepository.findById(dto.getCompeticaoId())
                    .orElseThrow(() -> new RuntimeException("Competição não encontrada"));
            time.setCompeticao(competicao);
        }
        Time timeSalvo = timeRepository.save(time);
        return ResponseEntity.status(HttpStatus.CREATED).body(timeSalvo);
    }

    @PostMapping("/{timeId}/jogadores")
    public ResponseEntity<TimeDTO> adicionarJogadorConvidado(@PathVariable Long timeId, @RequestBody JogadorDTO dto) {
        Time timeAtualizado = timeService.adicionarJogadorConvidado(timeId, dto);
        return ResponseEntity.ok(mapper.toTimeDTO(timeAtualizado));
    }
}