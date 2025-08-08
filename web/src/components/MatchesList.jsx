import React, { useState } from 'react';
import { Accordion, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const MatchesList = ({ partidas, onPlacarUpdate }) => {
    const [placares, setPlacares] = useState({});

    if (!partidas || partidas.length === 0) {
        return <p className="mt-4">Nenhuma partida gerada para esta competição ainda.</p>;
    }

    // 1. Agrupa as partidas por rodada
    const partidasPorRodada = partidas.reduce((acc, partida) => {
        const rodada = partida.rodada || 1; // Agrupa partidas sem rodada na primeira
        if (!acc[rodada]) {
            acc[rodada] = [];
        }
        acc[rodada].push(partida);
        return acc;
    }, {});

    const handlePlacarChange = (idPartida, time, valor) => {
        setPlacares(prev => ({
            ...prev,
            [idPartida]: { ...prev[idPartida], [time]: valor.replace(/[^0-9]/g, '') } // Permite apenas números
        }));
    };

    const handleSalvarPlacar = (idPartida) => {
        const placar = placares[idPartida];
        if (!placar || !placar.placarCasa || !placar.placarVisitante) {
            alert("Preencha ambos os placares.");
            return;
        }

        axios.put(`http://localhost:8080/api/partidas/${idPartida}`, {
            placarCasa: parseInt(placar.placarCasa),
            placarVisitante: parseInt(placar.placarVisitante)
        })
        .then(() => {
            alert('Placar salvo!');
            onPlacarUpdate();
        })
        .catch(error => console.error("Erro ao salvar placar:", error));
    };

    return (
        <div className="mt-4">
            <h4 className="mb-3">Jogos</h4>
            {/* 2. Usa um Accordion para mostrar/ocultar as rodadas */}
            <Accordion defaultActiveKey="0">
                {Object.keys(partidasPorRodada).map((rodada, index) => (
                    <Accordion.Item eventKey={index.toString()} key={rodada}>
                        <Accordion.Header>Rodada {rodada}</Accordion.Header>
                        <Accordion.Body>
                            {partidasPorRodada[rodada].map(partida => (
                                <Row key={partida.id} className="align-items-center mb-3 border-bottom pb-3">
                                    <Col className="text-end">{partida.timeCasa.nome}</Col>
                                    <Col xs="auto">
                                        <InputGroup size="sm" style={{ width: '150px' }}>
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                value={placares[partida.id]?.placarCasa ?? partida.placarCasa ?? ''}
                                                onChange={(e) => handlePlacarChange(partida.id, 'placarCasa', e.target.value)}
                                                disabled={partida.finalizada}
                                            />
                                            <InputGroup.Text>x</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                value={placares[partida.id]?.placarVisitante ?? partida.placarVisitante ?? ''}
                                                onChange={(e) => handlePlacarChange(partida.id, 'placarVisitante', e.target.value)}
                                                disabled={partida.finalizada}
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col>{partida.timeVisitante.nome}</Col>
                                    <Col xs="auto">
                                        {partida.finalizada ? (
                                            <Button variant="outline-secondary" size="sm" disabled>Finalizada</Button>
                                        ) : (
                                            <Button variant="outline-success" size="sm" onClick={() => handleSalvarPlacar(partida.id)}>Salvar</Button>
                                        )}
                                    </Col>
                                </Row>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default MatchesList;