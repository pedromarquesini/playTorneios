import React from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewTeam = () => {
    const navigate = useNavigate();
    const [jogadores, setJogadores] = useState([{ numero: '', nome: '' }]);
    const [competicoes, setCompeticoes] = useState([]);
    const [nomeTime, setNomeTime] = useState('');
    const [descricao, setDescricao] = useState('');
    const [competicaoSelecionada, setCompeticaoSelecionada] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/competicoes')
            .then(response => {
                setCompeticoes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar competições:', error);
            });
    }, []);

    const adicionarJogador = () => {
        setJogadores([...jogadores, { numero: '', nome: '' }]);
    };

    const handleRemoverJogador = (index) => {
        setJogadores(jogadores.filter((_, i) => i !== index));
    };

    const handleJogadorChange = (index, campo, valor) => {
        const novosJogadores = [...jogadores];
        novosJogadores[index][campo] = valor;
        setJogadores(novosJogadores);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!competicaoSelecionada) {
            alert("Por favor, selecione uma competição.");
            return;
        }

        const payload = {
            nome: nomeTime,
            descricao: descricao,
            competicaoId: parseInt(competicaoSelecionada),
            jogadores: jogadores.filter(j => j.nome.trim() !== '')
        };

        try {
            const response = await axios.post('http://localhost:8080/api/times', payload);
            if (response.status === 201) {
                alert('Time criado com sucesso!');
                navigate('/MyTeams');
            }
        } catch (error) {
            console.error('Erro ao criar time:', error);
            alert('Erro ao criar time. Verifique o console para mais detalhes.');
        }
    };

    return (
        <div className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
            <Row className="border rounded shadow p-4 bg-white">
                <h4 className="text-center mb-4">Cadastrar Novo Time</h4>
                <Col md={6}>
                    <h6 className="mb-3">Informações Básicas</h6>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome do time</Form.Label>
                        <Form.Control required placeholder="Time da Vila" value={nomeTime} onChange={(e) => setNomeTime(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Competição</Form.Label>
                        <Form.Select
                            required
                            value={competicaoSelecionada}
                            onChange={(e) => setCompeticaoSelecionada(e.target.value)}
                        >
                            <option value="">Selecione uma competição</option>
                            {competicoes.map((comp) => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={2} placeholder="Digite aqui uma breve descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Jogadores</h6>
                        <Button variant="success" size="sm" onClick={adicionarJogador}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                    <div className="border rounded p-3 bg-light" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                        {jogadores.map((jogador, index) => (
                            <InputGroup className="mb-2" key={index}>
                                <Form.Control
                                    type="number"
                                    placeholder="#"
                                    value={jogador.numero}
                                    onChange={(e) => handleJogadorChange(index, 'numero', e.target.value)}
                                    style={{ maxWidth: '80px' }}
                                />
                                <Form.Control
                                    placeholder="Nome do jogador"
                                    value={jogador.nome}
                                    onChange={(e) => handleJogadorChange(index, 'nome', e.target.value)}
                                />
                                <Button variant="danger" onClick={() => handleRemoverJogador(index)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </InputGroup>
                        ))}
                    </div>
                </Col>
                <div className="text-center mt-4">
                    <Button variant="dark" onClick={handleSubmit}>Criar Time</Button>
                </div>
            </Row>
        </div>
    );
}

export default NewTeam;