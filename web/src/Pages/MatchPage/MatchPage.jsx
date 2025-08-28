import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, ListGroup, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faSquare } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout';

const MatchPage = () => {
    const { id } = useParams();
    const [partida, setPartida] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPartida = useCallback(() => {
        axios.get(`http://localhost:8080/api/partidas/${id}`)
            .then(res => setPartida(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchPartida();
    }, [fetchPartida]);

    const registrarEvento = (jogadorId, timeId, tipo) => {
        const payload = { partidaId: id, jogadorId, timeId, tipo };
        axios.post('http://localhost:8080/api/partidas/eventos', payload)
            .then(() => {
                toast.success(`${tipo} registrado!`);
                fetchPartida();
            })
            .catch(err => toast.error('Erro ao registrar evento.'));
    };
    
    const finalizarPartida = () => {
        if(window.confirm("Tem certeza que deseja finalizar a partida?")){
            axios.post(`http://localhost:8080/api/partidas/${id}/finalizar`)
            .then(() => {
                toast.success('Partida finalizada com sucesso!');
                fetchPartida();
            })
            .catch(err => toast.error('Erro ao finalizar a partida.'));
        }
    };

    if (loading || !partida) return <Spinner animation="border" />;

    const eventosDaPartida = partida.eventos || [];
    const golsTimeCasa = eventosDaPartida.filter(e => e.tipo === 'GOL' && e.time.id === partida.timeCasa.id);
    const golsTimeVisitante = eventosDaPartida.filter(e => e.tipo === 'GOL' && e.time.id === partida.timeVisitante.id);

    return (
        <Layout>
            <Container fluid>
                <Card className="shadow-sm">
                    <Card.Header className="text-center">
                        <h3>{partida.timeCasa?.nome} <Badge bg="dark">{golsTimeCasa.length}</Badge> x <Badge bg="dark">{golsTimeVisitante.length}</Badge> {partida.timeVisitante?.nome}</h3>
                        <p className="text-muted mb-0">Rodada {partida.rodada} | Competição: {partida.competicao?.nome}</p>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <h5 className="mb-3">{partida.timeCasa?.nome}</h5>
                                <ListGroup variant="flush">
                                    {partida.timeCasa?.jogadores?.map(j => (
                                        <ListGroup.Item key={j.id} className="d-flex justify-content-between align-items-center">
                                            <span>{j.numero} - {j.nome}</span>
                                            <div>
                                                <Button size="sm" variant="outline-warning" className="me-2" onClick={() => registrarEvento(j.id, partida.timeCasa.id, 'CARTAO_AMARELO')} disabled={partida.finalizada}>
                                                    <FontAwesomeIcon icon={faSquare} />
                                                </Button>
                                                <Button size="sm" variant="outline-success" onClick={() => registrarEvento(j.id, partida.timeCasa.id, 'GOL')} disabled={partida.finalizada}>
                                                    <FontAwesomeIcon icon={faFutbol} />
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col md={6}>
                                <h5 className="mb-3">{partida.timeVisitante?.nome}</h5>
                                <ListGroup variant="flush">
                                    {partida.timeVisitante?.jogadores?.map(j => (
                                        <ListGroup.Item key={j.id} className="d-flex justify-content-between align-items-center">
                                            <span>{j.numero} - {j.nome}</span>
                                            <div>
                                                <Button size="sm" variant="outline-warning" className="me-2" onClick={() => registrarEvento(j.id, partida.timeVisitante.id, 'CARTAO_AMARELO')} disabled={partida.finalizada}>
                                                    <FontAwesomeIcon icon={faSquare} />
                                                </Button>
                                                <Button size="sm" variant="outline-success" onClick={() => registrarEvento(j.id, partida.timeVisitante.id, 'GOL')} disabled={partida.finalizada}>
                                                    <FontAwesomeIcon icon={faFutbol} />
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-center">
                        {partida.finalizada ? (
                            <Button variant="secondary" disabled>Partida Finalizada</Button>
                        ) : (
                            <Button variant="danger" onClick={finalizarPartida}>Finalizar Partida</Button>
                        )}
                    </Card.Footer>
                </Card>
            </Container>
        </Layout>
    );
};

export default MatchPage;