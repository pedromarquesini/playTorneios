import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, ListGroup, Button, Spinner, Modal, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import LeagueTable from '../../components/LeagueTable';
import MatchesList from '../../components/MatchesList';
import Artilharia from '../../components/Artilharia';
import AddExistingTeamModal from '../../components/AddExistingTeamModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CompetitionPage = () => {
    const { id } = useParams();
    const [competicao, setCompeticao] = useState(null);
    const [tabela, setTabela] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showAddTeamModal, setShowAddTeamModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchData = useCallback(() => {
        setLoading(true);
        const competicaoRequest = axios.get(`http://localhost:8080/api/competicoes/${id}`);
        const tabelaRequest = axios.get(`http://localhost:8080/api/competicoes/${id}/tabela`);

        Promise.all([competicaoRequest, tabelaRequest])
            .then(([competicaoRes, tabelaRes]) => {
                setCompeticao(competicaoRes.data);
                setTabela(tabelaRes.data);
            })
            .catch(error => console.error('Erro ao buscar dados:', error))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const confirmGerarPartidas = () => {
        axios.post(`http://localhost:8080/api/partidas/gerar/${id}`)
            .then(() => {
                toast.success('Partidas geradas com sucesso!');
                fetchData();
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || 'Ocorreu um erro ao gerar as partidas.';
                toast.error(`Erro: ${errorMsg}`);
            })
            .finally(() => setShowConfirmModal(false));
    };

    if (loading || !competicao) {
        return <Container fluid className="text-center"><Spinner animation="border" /></Container>;
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg={8}>
                        <div className="mb-4">
                            <h2 className="page-title">{competicao.nome}</h2>
                            <p className="text-secondary">{competicao.descricao}</p>
                            {user && user.role === 'ORGANIZADOR' && (
                                <Button variant="success" onClick={() => setShowConfirmModal(true)} className="btn-action">
                                    Gerar Partidas
                                </Button>
                            )}
                        </div>
                        <MatchesList partidas={competicao.partidas} onUpdate={fetchData} />
                        <LeagueTable tabela={tabela} loading={loading} />
                    </Col>
                    <Col lg={4}>
                        <Card className="shadow-sm mb-4">
                            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                                Times Inscritos ({competicao.times?.length || 0})
                                {user && user.role === 'ORGANIZADOR' && (
                                    <Button variant="outline-success" size="sm" onClick={() => setShowAddTeamModal(true)}>
                                        <FontAwesomeIcon icon={faPlus} /> Adicionar Time
                                    </Button>
                                )}
                            </Card.Header>
                            <ListGroup variant="flush">
                                {competicao.times?.map(time => (
                                    <ListGroup.Item key={time.id} action as={Link} to={`/time/${time.id}/perfil`} className="card-hover">
                                        {time.nome}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                        <Artilharia competicaoId={id} />
                    </Col>
                </Row>
            </Container>
            <AddExistingTeamModal 
                show={showAddTeamModal} 
                onHide={() => setShowAddTeamModal(false)} 
                competicaoId={id} 
                onTeamAdded={fetchData} 
            />
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>Confirmar Ação</Modal.Title></Modal.Header>
                <Modal.Body>Tem certeza que deseja gerar os jogos? Esta ação não pode ser desfeita.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
                    <Button variant="success" onClick={confirmGerarPartidas}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CompetitionPage;