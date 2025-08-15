package com.example.playtorneio.mapper;

import com.example.playtorneio.dto.*;
import com.example.playtorneio.model.*;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;

@Component
public class EntityMapper {

    public PartidaDTO toPartidaDTO(Partida partida) {
        PartidaDTO dto = new PartidaDTO();
        dto.setId(partida.getId());
        dto.setPlacarCasa(partida.getPlacarCasa());
        dto.setPlacarVisitante(partida.getPlacarVisitante());
        dto.setFinalizada(partida.isFinalizada());
        dto.setRodada(partida.getRodada());
        dto.setDataHora(partida.getDataHora());

        if (partida.getTimeCasa() != null) {
            dto.setTimeCasa(toTimeSimplesDTO(partida.getTimeCasa()));
        }
        if (partida.getTimeVisitante() != null) {
            dto.setTimeVisitante(toTimeSimplesDTO(partida.getTimeVisitante()));
        }
        if (partida.getCompeticao() != null) {
            dto.setCompeticao(toCompeticaoSimplesDTO(partida.getCompeticao()));
        }
        if (partida.getEventos() != null) {
            dto.setEventos(partida.getEventos().stream()
                .map(this::toEventoDTO).collect(Collectors.toList()));
        }
        return dto;
    }

    public EventoDTO toEventoDTO(Evento evento) {
        EventoDTO dto = new EventoDTO();
        dto.setId(evento.getId());
        dto.setTipo(evento.getTipo());
        if (evento.getJogador() != null) {
            dto.setJogador(toJogadorSimplesDTO(evento.getJogador()));
        }
        if (evento.getTime() != null) {
            dto.setTime(toTimeSimplesDTO(evento.getTime()));
        }
        return dto;
    }

    public TimeDTO toTimeDTO(Time time) {
        TimeDTO dto = new TimeDTO();
        dto.setId(time.getId());
        dto.setNome(time.getNome());
        dto.setDescricao(time.getDescricao());

        if (time.getCompeticao() != null) {
            dto.setCompeticaoNome(time.getCompeticao().getNome());
        }
        if (time.getJogadores() != null) {
            dto.setJogadores(time.getJogadores().stream()
                .map(this::toJogadorSimplesDTO).collect(Collectors.toList()));
        }
        return dto;
    }
    
    public TimeDetalheDTO toTimeDetalheDTO(Time time) {
        TimeDetalheDTO dto = new TimeDetalheDTO();
        dto.setId(time.getId());
        dto.setNome(time.getNome());
        if (time.getJogadores() != null) {
            dto.setJogadores(time.getJogadores().stream()
                .map(this::toJogadorSimplesDTO).collect(Collectors.toList()));
        }
        return dto;
    }

    public CompeticaoDTO toCompeticaoDTO(Competicao competicao) {
        CompeticaoDTO dto = new CompeticaoDTO();
        dto.setId(competicao.getId());
        dto.setNome(competicao.getNome());
        dto.setDescricao(competicao.getDescricao());
        dto.setModalidade(competicao.getModalidade());
        if (competicao.getTimes() != null) {
            dto.setTimes(competicao.getTimes().stream()
                .map(this::toTimeSimplesDTO).collect(Collectors.toList()));
        }
        if (competicao.getPartidas() != null) {
            dto.setPartidas(competicao.getPartidas().stream()
                .map(this::toPartidaSimplesDTO).collect(Collectors.toList()));
        }
        return dto;
    }
    
    public PartidaDetalheDTO toPartidaDetalheDTO(Partida partida) {
        PartidaDetalheDTO dto = new PartidaDetalheDTO();
        dto.setId(partida.getId());
        dto.setRodada(partida.getRodada());
        dto.setFinalizada(partida.isFinalizada());
        dto.setPlacarCasa(partida.getPlacarCasa());
        dto.setPlacarVisitante(partida.getPlacarVisitante());

        if (partida.getCompeticao() != null) {
            dto.setCompeticao(toCompeticaoSimplesDTO(partida.getCompeticao()));
        }
        if (partida.getTimeCasa() != null) {
            dto.setTimeCasa(toTimeDetalheDTO(partida.getTimeCasa()));
        }
        if (partida.getTimeVisitante() != null) {
            dto.setTimeVisitante(toTimeDetalheDTO(partida.getTimeVisitante()));
        }
        if (partida.getEventos() != null) {
            dto.setEventos(partida.getEventos().stream()
                .map(this::toEventoDTO).collect(Collectors.toList()));
        }
        return dto;
    }

    public TimeSimplesDTO toTimeSimplesDTO(Time time) {
        TimeSimplesDTO dto = new TimeSimplesDTO();
        dto.setId(time.getId());
        dto.setNome(time.getNome());
        return dto;
    }
    
    public CompeticaoSimplesDTO toCompeticaoSimplesDTO(Competicao competicao) {
        CompeticaoSimplesDTO dto = new CompeticaoSimplesDTO();
        dto.setId(competicao.getId());
        dto.setNome(competicao.getNome());
        return dto;
    }

    public JogadorSimplesDTO toJogadorSimplesDTO(Jogador jogador) {
        JogadorSimplesDTO dto = new JogadorSimplesDTO();
        dto.setId(jogador.getId());
        dto.setNome(jogador.getNome());
        dto.setNumero(jogador.getNumero());
        return dto;
    }
    
    public PartidaSimplesDTO toPartidaSimplesDTO(Partida partida) {
        PartidaSimplesDTO dto = new PartidaSimplesDTO();
        dto.setId(partida.getId());
        dto.setRodada(partida.getRodada());
        dto.setPlacarCasa(partida.getPlacarCasa());
        dto.setPlacarVisitante(partida.getPlacarVisitante());
        dto.setFinalizada(partida.isFinalizada());
        if (partida.getTimeCasa() != null) {
            dto.setTimeCasaNome(partida.getTimeCasa().getNome());
        }
        if (partida.getTimeVisitante() != null) {
            dto.setTimeVisitanteNome(partida.getTimeVisitante().getNome());
        }
        return dto;
    }

    public JogadorPerfilDTO toJogadorPerfilDTO(Jogador jogador) {
        JogadorPerfilDTO dto = new JogadorPerfilDTO();
        dto.setId(jogador.getId());
        dto.setNome(jogador.getNome());
        dto.setNumero(jogador.getNumero());

        if (jogador.getTime() != null) {
            dto.setTime(toTimeSimplesDTO(jogador.getTime()));
        }

        if (jogador.getUsuario() != null) {
            UsuarioSimplesDTO usuarioDto = new UsuarioSimplesDTO();
            usuarioDto.setId(jogador.getUsuario().getId());
            usuarioDto.setNome(jogador.getUsuario().getNome());
            dto.setUsuario(usuarioDto);
        }
        return dto;
    }
}