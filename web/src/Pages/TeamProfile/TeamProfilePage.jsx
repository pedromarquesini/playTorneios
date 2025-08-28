import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, ListGroup, Button, Badge } from 'react-bootstrap';

const TeamProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [time, setTime] = useState(null);
    const [tabela, setTabela] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/times/${id}`)
            .then(timeRes => {
                const timeData = timeRes.data;
                setTime(timeData);
                if (timeData && timeData.competicao) {
                    return axios.get(`http://localhost:8080/api/competicoes/${timeData.competicao.id}/tabela`);
                }
                return null;
            })
            .then(tabelaRes => {
                if (tabelaRes) {
                    setTabela(tabelaRes.data);
                }
            })
            .catch(err => console.error("Erro ao buscar dados:", err))
            .finally(() => setLoading(false));
    }, [id]);

    const estatisticasDoTime = time ? tabela.find(t => t.nomeTime === time.nome) : null;

    if (loading || !time) {
        return <Container fluid className="text-center p-4"><Spinner animation="border" /></Container>;
    }

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>{time.nome}</h2>
                    <p className="text-muted">{time.descricao}</p>
                </div>
                {user && (user.role === 'ORGANIZADOR' || user.role === 'REPRESENTANTE_TIME') && (
                     <Button variant="primary" onClick={() => navigate(`/time/${id}/gerenciar`)}>Gerenciar Time</Button>
                )}
            </div>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Header as="h5">Desempenho na Competição</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>Competição:</strong> {time.competicao ? time.competicao.nome : 'N/A'}</ListGroup.Item>
                            {estatisticasDoTime ? (
                                <>
                                    <ListGroup.Item><strong>Pontos:</strong> {estatisticasDoTime.pontos}</ListGroup.Item>
                                    <ListGroup.Item><strong>Jogos:</strong> {estatisticasDoTime.jogos}</ListGroup.Item>
                                    <ListGroup.Item><strong>Vitórias:</strong> {estatisticasDoTime.vitorias}</ListGroup.Item>
                                </>
                            ) : (
                                <ListGroup.Item>Aguardando início dos jogos.</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Header as="h5">Elenco</Card.Header>
                        <ListGroup variant="flush">
                            {time.jogadores && time.jogadores.length > 0 ? time.jogadores.map(jogador => (
                                <ListGroup.Item key={jogador.id} action as={Link} to={`/jogador/${jogador.id}/perfil`}>
                                    <span className="fw-bold me-2">{jogador.numero || '#'}</span>
                                    {jogador.nome}
                                </ListGroup.Item>
                            )) : (
                                <ListGroup.Item>Nenhum jogador cadastrado.</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TeamProfilePage;