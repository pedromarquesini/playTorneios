import React from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const MatchesList = ({ partidas }) => {
    if (!partidas || partidas.length === 0) {
        return <p className="mt-4">Nenhuma partida gerada para esta competição ainda.</p>;
    }

    const partidasPorRodada = partidas.reduce((acc, partida) => {
        const rodada = partida.rodada || 1;
        if (!acc[rodada]) acc[rodada] = [];
        acc[rodada].push(partida);
        return acc;
    }, {});

    return (
        <div className="mt-4">
            <h4 className="mb-3">Jogos</h4>
            <Accordion defaultActiveKey="0">
                {Object.keys(partidasPorRodada).map((rodada, index) => (
                    <Accordion.Item eventKey={index.toString()} key={rodada}>
                        <Accordion.Header>Rodada {rodada}</Accordion.Header>
                        <Accordion.Body>
                            {partidasPorRodada[rodada].map(partida => (
                                <Row key={partida.id} className="align-items-center mb-2 border-bottom pb-2">
                                    <Col className="text-end fw-bold">{partida.timeCasaNome}</Col>
                                    <Col xs="auto" className="text-center">
                                        {partida.finalizada ? `${partida.placarCasa} x ${partida.placarVisitante}` : 'vs'}
                                    </Col>
                                    <Col className="fw-bold">{partida.timeVisitanteNome}</Col>
                                    <Col xs="auto">
                                        <Link to={`/partida/${partida.id}`} className="btn btn-sm btn-outline-primary">
                                            <FontAwesomeIcon icon={faEdit} className="me-1" /> Gerenciar
                                        </Link>
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