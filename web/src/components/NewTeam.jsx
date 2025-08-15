import React from 'react';
import { Row, Col, Form, Button, Container, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewTeam = () => {
    const navigate = useNavigate();
    const [nomeTime, setNomeTime] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { nome: nomeTime, descricao };

        try {
            const response = await axios.post('http://localhost:8080/api/times', payload);
            if (response.status === 201) {
                toast.success('Time criado com sucesso!');
                navigate('/MyTeams');
            }
        } catch (error) {
            toast.error('Erro ao criar time.');
        }
    };

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="text-center mb-4 page-title">Criar Novo Time</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome do time</Form.Label>
                                    <Form.Control required placeholder="Nome do seu time" value={nomeTime} onChange={(e) => setNomeTime(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Uma breve descrição sobre o time" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                </Form.Group>
                                <div className="text-center mt-4">
                                    <Button variant="dark" type="submit" className="btn-action">Salvar Time</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default NewTeam;