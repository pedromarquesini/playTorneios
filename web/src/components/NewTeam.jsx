import React, { useState } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const NewTeam = () => {
    const [jogadores, setJogadores] = useState([{ numero: '', nome: '' }]);

    const adicionarJogador = () => {
        setJogadores([...jogadores, '']);
    };

    const handleRemoverJogador = (index) => {
        setJogadores(jogadores.filter((_, i) => i !== index));
    };

    const atualizarNomeJogador = (index, valor) => {
        const novosJogadores = [...jogadores];
        novosJogadores[index] = valor;
        setJogadores(novosJogadores);
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
                        <Form.Control placeholder="Time da Vila" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Competição</Form.Label>
                        <Form.Select>
                            <option>Campeonato Brasileiro</option>
                            <option>Copa PlayTorneios</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Logo do time</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={2} placeholder="Digite aqui uma breve descrição" />
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

                    <div className="border rounded p-3 bg-light">
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
                    <Button variant="dark">Criar time</Button>
                </div>
            </Row>
        </div>
    );
}

export default NewTeam;