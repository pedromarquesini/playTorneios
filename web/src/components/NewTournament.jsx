import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const NewTournament = () => {
  const [publica, setPublica] = useState(false);
  const [idaVolta, setIdaVolta] = useState(false);
  const [numTimes, setNumTimes] = useState(4);
  const [formato, setFormato] = useState('matamata');

  return (
    <div className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
      <Row className="border rounded shadow p-4 bg-white">
        <h4 className="text-center mb-4">Cadastrar nova competição</h4>
        {/* Coluna 1 - Informações Básicas */}
        <Col md={6}>
          <h6 className="mb-3">Informações Básicas</h6>

          <Form.Group className="mb-3">
            <Form.Label>Nome da competição</Form.Label>
            <Form.Control placeholder="Campeonato Brasileiro" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Modalidade</Form.Label>
            <Form.Select>
              <option>Futebol</option>
              <option>Vôlei</option>
              <option>Basquete</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Logo da competição</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={2} placeholder="Digite aqui uma breve descrição" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="publica-switch"
              label="Pública"
              checked={publica}
              onChange={() => setPublica(!publica)}
            />
            <Form.Text className="text-muted">Todos poderão ver a competição</Form.Text>
          </Form.Group>
        </Col>

        {/* Coluna 2 - Formatos e Regras */}
        <Col md={6}>
          <h6 className="mb-3">Formatos e Regras</h6>

          <Form.Group className="mb-3">
            <Form.Label>Número de times: {numTimes}</Form.Label>
            <Form.Range min={4} max={32} value={numTimes} onChange={(e)=> setNumTimes(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Formato da competição</Form.Label>
            <Form.Select>
              <option value="matamata">Mata-mata</option>
              <option value="pontosCorridos">Pontos corridos</option>
              <option value="suico">Suiço</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="ida-volta-switch"
              label="Jogos de Ida e Volta"
              checked={idaVolta}
              onChange={() => setIdaVolta(!idaVolta)}
            />
            <Form.Text className="text-muted">
              Para Pontos Corridos ou a fase de Mata-Mata.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Critérios de Desempate</Form.Label>
            <Form.Check type="checkbox" label="Números de Vitórias" />
            <Form.Check type="checkbox" label="Saldo de Gols" />
            <Form.Check type="checkbox" label="Confronto Direto" />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Data de Início</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Data de Término</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <div className="text-center mt-4">
        <Button variant="dark">Criar competição</Button>
      </div>
      </Row>      
    </div>
  );
};


export default NewTournament;
