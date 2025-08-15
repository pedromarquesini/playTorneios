import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewTeam = () => {
    const navigate = useNavigate();
    const [competicoes, setCompeticoes] = useState([]);
    const [nomeTime, setNomeTime] = useState('');
    const [descricao, setDescricao] = useState('');
    const [competicaoSelecionada, setCompeticaoSelecionada] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/competicoes')
            .then(response => setCompeticoes(response.data))
            .catch(error => console.error('Erro:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!competicaoSelecionada) {
            toast.warn("Selecione uma competição.");
            return;
        }

        const payload = {
            nome: nomeTime,
            descricao: descricao,
            competicaoId: parseInt(competicaoSelecionada)
        };

        try {
            const response = await axios.post('http://localhost:8080/api/times', payload);
            if (response.status === 201) {
                toast.success('Time criado com sucesso! Agora adicione os jogadores.');
                navigate(`/time/${response.data.id}/gerenciar`);
            }
        } catch (error) {
            console.error('Erro ao criar time.', error);
            toast.error('Erro ao criar time.');
        }
    };

    return (
        <div className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
            <Row className="border rounded shadow p-4 bg-white">
                <h4 className="text-center mb-4">Criar Novo Time</h4>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome do time</Form.Label>
                        <Form.Control required value={nomeTime} onChange={(e) => setNomeTime(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Competição</Form.Label>
                        <Form.Select required value={competicaoSelecionada} onChange={(e) => setCompeticaoSelecionada(e.target.value)}>
                            <option value="">Selecione uma competição</option>
                            {competicoes.map((comp) => (
                                <option key={comp.id} value={comp.id}>{comp.nome}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </Form.Group>
                </Col>
                <div className="text-center mt-4">
                    <Button variant="dark" onClick={handleSubmit}>Salvar e Adicionar Jogadores</Button>
                </div>
            </Row>
        </div>
    );
}

export default NewTeam;