import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const NewTeam = () => {
    const [jogadores, setJogadores] = useState([{ numero: '', nome: '' }]);
    const [competicoes, setCompeticoes] = useState(['']);
    const [nomeTime, setNomeTime] = useState('');
    const [descricao, setDescricao] = useState('');
    const [competicaoSelecionada, setCompeticaoSelecionada] = useState('');

    // Recupera as competições disponíveis
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
        const novosJogadores = jogadores.filter((_, i) => i !== index);
        setJogadores(novosJogadores);
    };

    const atualizarNomeJogador = (index, valor) => {
        const novosJogadores = [...jogadores];
        novosJogadores[index] = valor;
        setJogadores(novosJogadores);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            nome: nomeTime,
            descricao: descricao,
            competicaoId: competicaoSelecionada ? parseInt(competicaoSelecionada) : null,
            jogadores: jogadores
        };

        try {
            const res = await fetch('http://localhost:8080/api/times', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                alert('Time criado com sucesso!');
                Link('/dashboard');
            } else {
                alert('Erro ao criar time.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const handleJogadorChange = (index, campo, valor) => {
        const novosJogadores = [...jogadores];
        novosJogadores[index][campo] = valor;
        setJogadores(novosJogadores);
    };


    return (
        <div className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
            <Row className="border rounded shadow p-4 bg-white">
                <h4 className="text-center mb-4">Cadastrar novo time</h4>

                {/* Coluna 1 - Informações Básicas */}
                <Col md={6}>
                    <h6 className="mb-3">Informações Básicas</h6>

                    <Form.Group className="mb-3">
                        <Form.Label>Nome do time</Form.Label>
                        <Form.Control placeholder="Time da Vila" value={nomeTime} onChange={(e) => setNomeTime(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Competição</Form.Label>
                        <Form.Select
                            value={competicaoSelecionada}
                            onChange={(e) => setCompeticaoSelecionada(e.target.value)}
                        >
                            <option value="">Selecione uma competição (opcional)</option>
                            {competicoes.map((comp) => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Logo do time</Form.Label>
                        <Form.Control type="file" disabled={true} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={2} placeholder="Digite aqui uma breve descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </Form.Group>

                </Col>

                {/* Coluna 2 - Jogadores */}
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
                    <Button variant="dark" onClick={handleSubmit}>Criar time</Button>
                </div>
            </Row>
        </div>
    );
}

export default NewTeam;