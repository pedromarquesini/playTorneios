package com.example.playtorneio.controller;

import com.example.playtorneio.dto.CompeticaoDTO;
import com.example.playtorneio.dto.CompeticaoResponseDTO;
import com.example.playtorneio.model.Competicao;
import com.example.playtorneio.repository.CompeticaoRepository;
import com.example.playtorneio.service.CompeticaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/competicoes")
@RequiredArgsConstructor
public class CompeticaoController {
    private final CompeticaoService service;

    private final CompeticaoRepository repository;

    @GetMapping
    public List<CompeticaoResponseDTO> listaCompeticoes() {


        return repository.findAll().stream().map(c-> new CompeticaoResponseDTO(
                    c.getId(),
                    c.getNome(),
                    c.getDescricao(),
                    c.getDataInicio() != null ? c.getDataInicio().toString() : "Sem data de início",
                    c.getDataTermino() != null ? c.getDataTermino().toString() : "Sem data de término",
                    c.getPublica().toString(),
                    c.getModalidade(),
                    c.getNumeroTimes() != null ? c.getNumeroTimes().toString(): "Número de times não definido")
                )
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> criarCompeticao(@RequestBody @Valid CompeticaoDTO dto) {
        System.out.println("Data de início: " + dto.getDataInicio());
        System.out.println("Data de término: " + dto.getDataTermino());
        Competicao salva = service.salvar(dto);
        return ResponseEntity.ok(salva);
    }
}
