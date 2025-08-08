import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewTournament = () => {
    const navigate = useNavigate();
    const [publica, setPublica] = useState(false);
    const [idaVolta, setIdaVolta] = useState(false);
    const [numTimes, setNumTimes] = useState(4);
    const [formato, setFormato] = useState('pontosCorridos');
    const [modalidade, setModalidade] = useState('Futebol');
    const [nomeCompeticao, setNomeCompeticao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataTermino, setDataTermino] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            nome: nomeCompeticao,
            descricao: descricao,
            modalidade: modalidade,
            publica: publica,
            numeroTimes: numTimes,
            formato: formato,
            idaVolta: idaVolta,
            dataInicio: dataInicio,
            dataTermino: dataTermino
        };
        try {
            const response = await axios.post('http://localhost:8080/api/competicoes', payload);
            if (response.status === 200 || response.status === 201) {
                alert('Competição criada com sucesso!');
                navigate('/MyTournaments');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao criar competição.');
        }
    };

    return (
        <div className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
            <Row className="border rounded shadow p-4 bg-white">
                <h4 className="text-center mb-4">Cadastrar Nova Competição</h4>
                <Col md={6}>
                    <h6 className="mb-3">Informações Básicas</h6>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome da competição</Form.Label>
                        <Form.Control required placeholder="Campeonato Brasileiro" value={nomeCompeticao} onChange={(e) => setNomeCompeticao(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Modalidade</Form.Label>
                        <Form.Select value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
                            <option>Futebol</option>
                            <option>Vôlei</option>
                            <option>Basquete</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={2} placeholder="Digite aqui uma breve descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="switch" label="Pública" checked={publica} onChange={() => setPublica(!publica)} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <h6 className="mb-3">Formatos e Regras</h6>
                    <Form.Group className="mb-3">
                        <Form.Label>Número de times: {numTimes}</Form.Label>
                        <Form.Range min={2} max={32} value={numTimes} onChange={(e) => setNumTimes(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Formato da competição</Form.Label>
                        <Form.Select value={formato} onChange={(e) => setFormato(e.target.value)}>
                            <option value="pontosCorridos">Pontos corridos</option>
                            <option value="matamata">Mata-mata</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="switch" label="Jogos de Ida e Volta" checked={idaVolta} onChange={() => setIdaVolta(!idaVolta)} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Data de Início</Form.Label>
                                <Form.Control type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Data de Término</Form.Label>
                                <Form.Control type="date" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <div className="text-center mt-4">
                    <Button variant="dark" onClick={handleSubmit}>Criar Competição</Button>
                </div>
            </Row>
        </div>
    );
};

export default NewTournament;