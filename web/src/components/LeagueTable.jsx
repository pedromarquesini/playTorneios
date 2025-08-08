import React from 'react';
import { Table, Spinner } from 'react-bootstrap';

const LeagueTable = ({ tabela, loading }) => {
    if (loading) {
        return <div className="text-center"><Spinner animation="border" /></div>;
    }

    if (!tabela || tabela.length === 0) {
        return <p>A tabela de classificação ainda não está disponível.</p>;
    }

    return (
        <div className="mt-4">
            <h4 className="mb-3">Tabela de Classificação</h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>P</th>
                        <th>J</th>
                        <th>V</th>
                        <th>E</th>
                        <th>D</th>
                        <th>GP</th>
                        <th>GC</th>
                        <th>SG</th>
                    </tr>
                </thead>
                <tbody>
                    {tabela.map((item, index) => (
                        <tr key={item.nomeTime}>
                            <td>{index + 1}</td>
                            <td>{item.nomeTime}</td>
                            <td><strong>{item.pontos}</strong></td>
                            <td>{item.jogos}</td>
                            <td>{item.vitorias}</td>
                            <td>{item.empates}</td>
                            <td>{item.derrotas}</td>
                            <td>{item.golsPro}</td>
                            <td>{item.golsContra}</td>
                            <td>{item.saldoGols}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default LeagueTable;