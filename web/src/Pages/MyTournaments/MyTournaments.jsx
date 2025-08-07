import React from 'react';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

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

    return (
        <>        
        <div className="p-4 bg-white rounded mb-2 " style={{ marginTop: '80px', marginLeft: '210px', width: 'calc(100% - 200px)' }}>
            <h3 className="mb-4">Meus Torneios</h3>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : torneios.length === 0 ? (
                <p>Nenhum torneio encontrado.</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {torneios.map(torneio => (
                        <Col key={torneio.id}>
                            <Card className="shadow-sm h-100">
                                <Card.Body>
                                    <Card.Title>{torneio.nome}</Card.Title>
                                    {torneio.descricao && <Card.Text>{torneio.descricao}</Card.Text>}
                                    <ul className="list-unstyled mb-0">
                                        {torneio.modalidade && <li><strong>Modalidade:</strong> {torneio.modalidade}</li>}
                                        {torneio.numeroTimes && <li><strong>Times:</strong> {torneio.numeroTimes}</li>}
                                        {torneio.visibilidade && <li><strong>Visibilidade:</strong> {torneio.visibilidade}</li>}
                                        {torneio.formato && <li><strong>Formato:</strong> {torneio.formato}</li>}
                                        {torneio.dataInicio && <li><strong>Início:</strong> {torneio.dataInicio}</li>}
                                        {torneio.dataFim && <li><strong>Fim:</strong> {torneio.dataFim}</li>}
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
        </>

    );
};

export default MyTournaments;
