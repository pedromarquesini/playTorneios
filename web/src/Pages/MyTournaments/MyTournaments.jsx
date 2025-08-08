import React from 'react';
import { useEffect, useState } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            <div className="text-center p-4" style={{ marginTop: '80px', marginLeft: '210px' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
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
        </div>
    );
};

export default MyTournaments;