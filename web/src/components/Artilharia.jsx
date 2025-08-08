import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Spinner } from 'react-bootstrap';

const Artilharia = ({ competicaoId }) => {
    const [artilheiros, setArtilheiros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (competicaoId) {
            axios.get(`http://localhost:8080/api/estatisticas/competicao/${competicaoId}/artilharia`)
                .then(response => setArtilheiros(response.data))
                .catch(error => console.error("Erro ao buscar artilharia:", error))
                .finally(() => setLoading(false));
        }
    }, [competicaoId]);

    if (loading) return <Spinner animation="border" size="sm" />;

    return (
        <Card className="mt-4">
            <Card.Header as="h5">Artilharia</Card.Header>
            {artilheiros.length > 0 ? (
                <ListGroup variant="flush">
                    {artilheiros.map((artilheiro, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{artilheiro.nomeJogador}</strong>
                                <br />
                                <small className="text-muted">{artilheiro.nomeTime}</small>
                            </div>
                            <span className="fw-bold">{artilheiro.gols} Gols</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <Card.Body>Nenhum gol marcado ainda.</Card.Body>
            )}
        </Card>
    );
};

export default Artilharia;