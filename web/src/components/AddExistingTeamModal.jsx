import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddExistingTeamModal = ({ show, onHide, competicaoId, onTeamAdded }) => {
    const [timesDisponiveis, setTimesDisponiveis] = useState([]);
    const [timesSelecionados, setTimesSelecionados] = useState([]);

    useEffect(() => {
        if (show) {
            axios.get('http://localhost:8080/api/times/disponiveis')
                .then(res => setTimesDisponiveis(res.data))
                .catch(() => toast.error("Erro ao buscar times disponíveis."));
        }
    }, [show]);

    const handleToggleTime = (timeId) => {
        setTimesSelecionados(prev => 
            prev.includes(timeId) 
                ? prev.filter(id => id !== timeId) 
                : [...prev, timeId]
        );
    };

    const handleSave = () => {
        const promises = timesSelecionados.map(timeId =>
            axios.put(`http://localhost:8080/api/competicoes/${competicaoId}/times/${timeId}`)
        );

        Promise.all(promises)
            .then(() => {
                toast.success(`${timesSelecionados.length} time(s) adicionado(s) com sucesso!`);
                onTeamAdded();
                onHide();
            })
            .catch(() => toast.error("Erro ao adicionar os times."));
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton><Modal.Title>Adicionar Times Existentes</Modal.Title></Modal.Header>
            <Modal.Body>
                <p>Selecione um ou mais times da lista de equipas disponíveis.</p>
                <ListGroup style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {timesDisponiveis.map(time => (
                        <ListGroup.Item key={time.id}>
                            <Form.Check 
                                type="checkbox"
                                id={`time-${time.id}`}
                                label={time.nome}
                                onChange={() => handleToggleTime(time.id)}
                                checked={timesSelecionados.includes(time.id)}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={handleSave} disabled={timesSelecionados.length === 0}>
                    Adicionar Selecionados
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddExistingTeamModal;