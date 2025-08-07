import '../Login/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [termosAceitos, setTermosAceitos] = useState(false);

  const navigate = useNavigate();
  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/');
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      nome: nome,
      email: email,
      senha: senha
    };
    try {
      const response = await fetch('http://localhost:8080/api/auth/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        navigate('/');
      } else if (response.status === 400) {
        const errorData = await response.text();
        alert('Erro: ' + errorData);
      } else {
        alert('Erro desconhecido ao cadastrar usuário.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na comunicação com o servidor.');
    }
  }

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="login-container d-flex bg-white rounded-4 shadow w-75 overflow-hidden">
        {/* Lado esquerdo - logo */}
        <div className="logo-side d-flex flex-column justify-content-center align-items-center bg-white w-50 p-4">
          <img src={logo} alt="PlayTorneios logo" className="img-fluid" style={{ maxHeight: '800px' }} />
        </div>

        {/* Lado direito - formulário */}
        <div className="form-side bg-success text-white w-50 p-5 d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-1 text-center">Cadastro</h2>
          <p className="mb-4 text-center">Já possui uma conta? Faça o <a href='#' onClick={handleLoginClick} className='text-reset'>Login</a></p>

          <form onSubmit={handleRegister}>

            <div className="mb-3">
              <label className="form-label text-white">Nome</label>
              <input type="text" className="form-control" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input type="email" className="form-control" placeholder="Digite seu seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <input type="password" className="form-control" placeholder="Digite a sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>

            <div className='mb-3'>
              <input type="checkbox" className='me-2' checked={termosAceitos} onChange={(e) => setTermosAceitos(e.target.checked)} />
              <label className='form-label text-white'>Aceito os termos de serviço</label>
            </div>

            <button type="submit" className="btn btn-success w-100 mt-2 bg-white text-success fw-bold" disabled={!termosAceitos || !nome || !email || !senha}>
              Cadastrar
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
