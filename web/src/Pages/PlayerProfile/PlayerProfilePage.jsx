import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Spinner, ListGroup, Badge, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faSquare } from '@fortawesome/free-solid-svg-icons';

const PlayerProfilePage = () => {
    const { id } = useParams();
    const [jogador, setJogador] = useState(null);
    const [estatisticas, setEstatisticas] = useState({ gols: 0, amarelos: 0, vermelhos: 0 });
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchJogador = axios.get(`http://localhost:8080/api/jogadores/${id}`);
        const fetchEstatisticas = axios.get(`http://localhost:8080/api/jogadores/${id}/estatisticas`);

        Promise.all([fetchJogador, fetchEstatisticas])
            .then(([jogadorRes, statsRes]) => {
                setJogador(jogadorRes.data);
                setEstatisticas(statsRes.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading || !jogador) {
        return <Container className="text-center"><Spinner animation="border" /></Container>;
    }

    return (
        <Container>
            <Card className="mt-4">
                <Card.Header as="h2">{jogador.nome}</Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Número da Camisa:</strong> {jogador.numero || 'Não definido'}</ListGroup.Item>
                        <ListGroup.Item><strong>Time Atual:</strong> {jogador.time ? jogador.time.nome : 'Sem time'}</ListGroup.Item>
                        {user && user.role !== 'PUBLICO' && jogador.usuario && (
                            <ListGroup.Item>
                                <strong>Status:</strong> Vinculado ao usuário <Badge bg="success">{jogador.usuario.nome}</Badge>
                            </ListGroup.Item>
                        )}
                    </ListGroup>

                    <h4 className="mt-4">Estatísticas na Carreira</h4>
                    <Row className="text-center">
                        <Col>
                            <Card bg="success" text="white" className="p-2">
                                <FontAwesomeIcon icon={faFutbol} size="2x" />
                                <h5>{estatisticas.gols}</h5>
                                <p className="mb-0">Gols</p>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="warning" text="dark" className="p-2">
                                <FontAwesomeIcon icon={faSquare} size="2x" />
                                <h5>{estatisticas.amarelos}</h5>
                                <p className="mb-0">Amarelos</p>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="danger" text="white" className="p-2">
                                <FontAwesomeIcon icon={faSquare} size="2x" />
                                <h5>{estatisticas.vermelhos}</h5>
                                <p className="mb-0">Vermelhos</p>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PlayerProfilePage;