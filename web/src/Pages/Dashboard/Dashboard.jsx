import React from 'react';
import './Dashboard.css';
import { Container, Row, Col, Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUsers, faUserPlus, faUser, faPlus, faUserTie } from '@fortawesome/free-solid-svg-icons';
 import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const nomeUsuario = "Usuário"; // Substitua pelo nome do usuário logado

    return (
        <>
            <div className='bg-secondary d-flex'>
                <Header />
                <Sidebar />
                <div className='bg-secondary vh-100'>
                    <Container fluid style={{ marginTop: '70px', marginLeft: '200px', padding: '30px', width: 'calc(100% - 200px)' }}>
                        
                        <div className="d-flex align-items-center mb-5 justify-content-center">
                            <FontAwesomeIcon icon={faUserTie} size="2x" className="me-3 text-white" />
                            <h3 className="text-white">Bem-vindo, {nomeUsuario}</h3>
                        </div>

                        
                        <Row xs={1} md={3} className="g-4">
                            <Col>
                                <Card className="text-center shadow-sm h-100">
                                    <Card.Body>
                                        <FontAwesomeIcon icon={faTrophy} size="2x" className="mb-2 text-primary" />
                                        <Card.Title>Meus Torneios</Card.Title>
                                        <Button variant="primary" className="mt-2 w-100" as={Link} to="/MyTournaments">Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="text-center shadow-sm h-100">
                                    <Card.Body>
                                        <FontAwesomeIcon icon={faUsers} size="2x" className="mb-2 text-primary" />
                                        <Card.Title>Meus Times</Card.Title>
                                        <Button variant="primary" className="mt-2 w-100">Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="text-center shadow-sm h-100">
                                    <Card.Body>
                                        <FontAwesomeIcon icon={faUser} size="2x" className="mb-2 text-primary" />
                                        <Card.Title>Meus Jogadores</Card.Title>
                                        <Button variant="primary" className="mt-2 w-100">Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="text-center shadow-sm h-100">
                                    <Card.Body>
                                        <FontAwesomeIcon icon={faPlus} size="2x" className="mb-2 text-success" />
                                        <Card.Title>Adicionar Torneio</Card.Title>
                                        <Button variant="success" className="mt-2 w-100" as={Link} to="/NewTournament">Adicionar</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col>
                                <Card className="text-center shadow-sm h-100">
                                    <Card.Body>
                                        <FontAwesomeIcon icon={faPlus} size="2x" className="mb-2 text-success" />
                                        <Card.Title>Adicionar Time</Card.Title>
                                        <Button variant="success" className="mt-2 w-100" as={Link} to="/NewTeam">Adicionar</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col>
                                <Card className="text-center shadow-sm h-100">
                                    <Card.Body>
                                        <FontAwesomeIcon icon={faUserPlus} size="2x" className="mb-2 text-success" />
                                        <Card.Title>Adicionar Jogador</Card.Title>
                                        <Button variant="success" className="mt-2 w-100">Adicionar</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

        </>
    );

}

export default Dashboard;