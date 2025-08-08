import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

const MyTeams = () => {
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/times')
            .then(response => {
                setTimes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar os times:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center p-4">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <div className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
            <h4 className="mb-4">Meus Times</h4>

            {times.length === 0 ? (
                <p>Nenhum time cadastrado ainda.</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {times.map(time => (
                        <Col key={time.id}>
                            <Card className="shadow-sm h-100">
                                <Card.Body>
                                    <Card.Title>{time.nome}</Card.Title>
                                    <Card.Text>
                                        {time.descricao || 'Time sem descrição.'}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">
                                        Competição: {time.competicao ? time.competicao.nome : 'N/A'}
                                    </small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default MyTeams;