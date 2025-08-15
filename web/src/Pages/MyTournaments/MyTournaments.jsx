import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';

const MyTournaments = () => {
    const [torneios, setTorneios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/competicoes')
            .then(response => {
                setTorneios(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar torneios:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container fluid className="text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container fluid>
            <h4 className="mb-4">Meus Torneios</h4>
            {torneios.length === 0 ? (
                <p>Nenhum torneio encontrado.</p>
            ) : (
                <ListGroup>
                    {torneios.map(torneio => (
                        <ListGroup.Item
                            key={torneio.id}
                            action
                            as={Link}
                            to={`/competicao/${torneio.id}`}
                        >
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold">{torneio.nome}</span>
                                <span className="text-muted">{torneio.modalidade}</span>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

export default MyTournaments;