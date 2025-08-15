import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Spinner, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyTeamsPage = () => {
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/times')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setTimes(response.data);
                }
            })
            .catch(error => console.error('Erro ao buscar os times:', error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Container fluid className="text-center"><Spinner animation="border" /></Container>;
    }

    return (
        <Container fluid>
            <h4 className="mb-4">Meus Times</h4>
            {times.length === 0 ? (
                <p>Nenhum time cadastrado ainda.</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {times.map(time => (
                        <Col key={time.id}>
                            <Link to={`/time/${time.id}/perfil`} className="text-decoration-none text-dark">
                                <Card className="shadow-sm h-100 card-hover">
                                    <Card.Body>
                                        <Card.Title>{time.nome}</Card.Title>
                                        <Card.Text>{time.descricao || 'Time sem descrição.'}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">
                                            Competição: {time.competicaoNome || 'Nenhuma'}
                                        </small>
                                    </Card.Footer>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default MyTeamsPage;