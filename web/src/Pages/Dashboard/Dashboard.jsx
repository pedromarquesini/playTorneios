import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Container fluid>
            <h4 className="mb-4">Painel de Controle</h4>
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm h-100">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faTrophy} className="me-2" />Competições</Card.Title>
                            <Card.Text>Crie novas competições ou visualize as existentes.</Card.Text>
                            {user && user.role === 'ORGANIZADOR' && (
                                <Button variant="success" className="me-2" onClick={() => navigate('/NewTournament')}>
                                    <FontAwesomeIcon icon={faPlus} className="me-1" /> Criar Competição
                                </Button>
                            )}
                            <Button variant="outline-secondary" onClick={() => navigate('/MyTournaments')}>
                                <FontAwesomeIcon icon={faList} className="me-1" /> Ver Torneios
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm h-100">
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faUsers} className="me-2" />Times</Card.Title>
                            <Card.Text>Adicione novos times e jogadores às suas competições.</Card.Text>
                            {user && (user.role === 'ORGANIZADOR' || user.role === 'REPRESENTANTE_TIME') && (
                                <Button variant="primary" className="me-2" onClick={() => navigate('/NewTeam')}>
                                    <FontAwesomeIcon icon={faPlus} className="me-1" /> Criar Time
                                </Button>
                            )}
                            <Button variant="outline-secondary" onClick={() => navigate('/MyTeams')}>
                                <FontAwesomeIcon icon={faList} className="me-1" /> Ver Times
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;