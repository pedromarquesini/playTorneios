import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/logo.png'

const Login = () => {
  const navigate = useNavigate();

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/Register');
  }

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLoginClick = async (e) => {
    e.preventDefault();
    // Implement login logic here
    const payload = {
      email: email,
      senha: senha
    };
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('Login realizado com sucesso!');
        navigate('/dashboard'); // Redirect to dashboard or home page
      } else if (response.status === 401) {
        alert('Email ou senha incorretos.');
      } else {
        alert('Erro desconhecido ao realizar login.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na comunicação com o servidor.');
    }
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="login-container d-flex bg-white rounded-4 shadow w-75 overflow-hidden">

        <div className="logo-side d-flex flex-column justify-content-center align-items-center bg-white w-50 p-4">
          <img src={logo} alt="PlayTorneios logo" className="img-fluid" style={{ maxHeight: '800px' }} />
        </div>

        <div className="form-side bg-success text-white w-50 p-5 d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-1 text-center">Login</h2>
          <p className="mb-4 text-center">Organizando o seu torneio da melhor forma</p>

          <form onSubmit={handleLoginClick} className="w-100">
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input type="email" className="form-control" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <input type="password" className="form-control" placeholder="Digite a sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success w-100 mt-2 bg-white text-success fw-bold">
              Login
            </button>
            <button onClick={handleRegisterClick} type='button' className="btn btn-sucess w-100 mt-2 bg-black text-success fw-bold">
              Cadastrar-se
            </button>
            <div className="mt-3">
              <a className="text-white text-decoration-underline">Esqueceu a sua senha?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
