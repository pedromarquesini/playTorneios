import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, ListGroup, Button, Spinner, Modal } from 'react-bootstrap'; // 1. Importe o Modal
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import LeagueTable from '../../components/LeagueTable';
import MatchesList from '../../components/MatchesList';

const CompetitionPage = () => {
    const { id } = useParams();
    const [competicao, setCompeticao] = useState(null);
    const [tabela, setTabela] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false); // 2. State para controlar o modal

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

    // 3. Esta função agora apenas executa a lógica da API
    const confirmGerarPartidas = () => {
        axios.post(`http://localhost:8080/api/partidas/gerar/${id}`)
            .then(() => {
                alert('Partidas geradas com sucesso!');
                fetchData();
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(`Erro: ${error.response.data.message}`);
                } else {
                    alert('Ocorreu um erro ao gerar as partidas.');
                }
                console.error('Erro ao gerar partidas:', error);
            })
            .finally(() => {
                setShowConfirmModal(false); // Fecha o modal após a ação
            });
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100"><Spinner animation="border" /></div>;
    }

    if (!competicao) {
        return <h2>Competição não encontrada.</h2>;
    }

    return (
        <> {/* Use Fragment para encapsular o JSX e o Modal */}
            <div className='bg-light'>
                <Header />
                <div className='d-flex'>
                    <Sidebar />
                    <div className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
                        <Row>
                            <Col md={8}>
                                <h2>{competicao.nome}</h2>
                                <p className="text-muted">{competicao.descricao}</p>
                                {/* 4. O botão agora apenas abre o modal */}
                                <Button variant="success" onClick={() => setShowConfirmModal(true)} className="mb-4">
                                    Gerar Partidas
                                </Button>

                                <MatchesList partidas={competicao.partidas} onPlacarUpdate={fetchData} />
                                <LeagueTable tabela={tabela} loading={loading} />
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <Card.Header as="h5">Times Inscritos ({competicao.times.length})</Card.Header>
                                    <ListGroup variant="flush">
                                        {competicao.times.map(time => (
                                            <ListGroup.Item key={time.id}>{time.nome}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

            {/* 5. Componente Modal */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Ação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja gerar os jogos? Esta ação não pode ser desfeita.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={confirmGerarPartidas}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CompetitionPage;