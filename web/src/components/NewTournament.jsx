import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NewTournament = () => {
  const [publica, setPublica] = useState(false);
  const [idaVolta, setIdaVolta] = useState(false);
  const [numTimes, setNumTimes] = useState(4);
  const [formato, setFormato] = useState('matamata');
  const [modalidade, setModalidade] = useState('Futebol');
  const [nomeCompeticao, setNomeCompeticao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [logo, setLogo] = useState(null);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nome: nomeCompeticao,
      descricao: descricao,
      modalidade: modalidade,
      publica: publica,
      numero_times: numTimes,
      formato: formato,
      idaVolta: idaVolta,
      dataInicio: dataInicio,
      dataTermino: dataFim
    };
    try {
      const response = await fetch('http://localhost:8080/api/competicoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('Competição criada com sucesso!');    
        Link('/dashboard');
      } else {
        alert('Erro ao criar competição.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na comunicação com o servidor.');
    }

  };

  return (
    <div className="p-4" style={{ marginTop: '70px', marginLeft: '200px', width: 'calc(100% - 200px)' }}>
      <Row className="border rounded shadow p-4 bg-white">
        <h4 className="text-center mb-4">Cadastrar nova competição</h4>
        {/* Coluna 1 - Informações Básicas */}
        <Col md={6}>
          <h6 className="mb-3">Informações Básicas</h6>

          <Form.Group className="mb-3">
            <Form.Label>Nome da competição</Form.Label>
            <Form.Control placeholder="Campeonato Brasileiro" value={nomeCompeticao} onChange={(e) => setNomeCompeticao(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Modalidade</Form.Label>
            <Form.Select value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
              <option>Futebol</option>
              <option>Vôlei</option>
              <option>Basquete</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Logo da competição</Form.Label>
            <Form.Control type="file" value={logo} onChange={(e) => setLogo(e.target.files[0])} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={2} placeholder="Digite aqui uma breve descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
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
            <Form.Select value={formato} onChange={(e) => setFormato(e.target.value)}>
              <option value="matamata">Mata-mata</option>
              <option value="pontosCorridos">Pontos corridos</option>
              {/*<option value="suico">Suiço</option> */}
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
                <Form.Control type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Data de Término</Form.Label>
                <Form.Control type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <div className="text-center mt-4">
        <Button variant="dark" onClick={handleSubmit}>Criar competição</Button>
      </div>
      </Row>      
    </div>
  );
};


export default NewTournament;
