import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, ListGroup, Form, InputGroup, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

const TeamManagementPage = () => {
    const { id } = useParams();
    const [time, setTime] = useState(null);
    const [usuariosJogadores, setUsuariosJogadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [novoJogadorNome, setNovoJogadorNome] = useState('');
    const [novoJogadorNumero, setNovoJogadorNumero] = useState('');
    const [vinculoPendente, setVinculoPendente] = useState({});

    const fetchData = useCallback(() => {
        axios.get(`http://localhost:8080/api/times/${id}`)
            .then(res => setTime(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchData();
        axios.get('http://localhost:8080/api/usuarios/jogadores')
            .then(res => setUsuariosJogadores(res.data))
            .catch(err => console.error(err));
    }, [fetchData, id]);

    const handleAdicionarJogador = () => {
        if (!novoJogadorNome) {
            toast.warn('Digite o nome do jogador.');
            return;
        }
        const payload = { nome: novoJogadorNome, numero: novoJogadorNumero || null };
        axios.post(`http://localhost:8080/api/times/${id}/jogadores`, payload)
            .then(() => {
                toast.success('Jogador adicionado com sucesso!');
                fetchData();
                setNovoJogadorNome('');
                setNovoJogadorNumero('');
            })
            .catch(err => toast.error('Erro ao adicionar jogador.'));
    };

    const handleVincularUsuario = (jogadorId) => {
        const usuarioId = vinculoPendente[jogadorId];
        if (!usuarioId) {
            toast.warn('Selecione um usuário para vincular.');
            return;
        }
        axios.put(`http://localhost:8080/api/jogadores/${jogadorId}/vincular/${usuarioId}`)
            .then(() => {
                toast.success('Jogador vinculado com sucesso!');
                fetchData();
                setVinculoPendente(prev => ({ ...prev, [jogadorId]: '' }));
            })
            .catch(err => toast.error(`Erro: ${err.response?.data?.message || 'Não foi possível vincular.'}`));
    };

    if (loading || !time) {
        return <Container fluid className="text-center"><Spinner animation="border" /></Container>;
    }

    return (
        <Container fluid>
            <h2>Gerir Time: {time.nome}</h2>
            <p className="text-muted">Competição: {time.competicaoNome}</p>
            <Row>
                <Col md={7}>
                    <Card>
                        <Card.Header>Adicionar Novo Jogador ao Elenco</Card.Header>
                        <Card.Body>
                            <InputGroup>
                                <Form.Control type="number" placeholder="#" value={novoJogadorNumero} onChange={e => setNovoJogadorNumero(e.target.value)} style={{ maxWidth: '80px' }} />
                                <Form.Control placeholder="Nome do jogador" value={novoJogadorNome} onChange={e => setNovoJogadorNome(e.target.value)} />
                                <Button onClick={handleAdicionarJogador}>Adicionar</Button>
                            </InputGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={5}>
                    <Card>
                        <Card.Header>Elenco Atual ({time.jogadores?.length || 0})</Card.Header>
                        <ListGroup variant="flush">
                            {time.jogadores?.map(j => (
                                <ListGroup.Item key={j.id}>
                                    <div className="fw-bold">{j.numero || '#'} - {j.nome}</div>
                                    {!j.usuario ? (
                                        <InputGroup size="sm" className="mt-2">
                                            <Form.Select onChange={e => setVinculoPendente(prev => ({...prev, [j.id]: e.target.value}))}>
                                                <option value="">Vincular a um usuário...</option>
                                                {usuariosJogadores.map(u => (
                                                    <option key={u.id} value={u.id}>{u.nome}</option>
                                                ))}
                                            </Form.Select>
                                            <Button variant="outline-success" onClick={() => handleVincularUsuario(j.id)}>Vincular</Button>
                                        </InputGroup>
                                    ) : (
                                        <small className="text-success">Vinculado a: {j.usuario.nome}</small>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TeamManagementPage;