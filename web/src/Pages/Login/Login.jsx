import './Login.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'

const Login = () => {
  const navigate = useNavigate();

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/Register');
  }

  const handleLoginClick = (e) => {
    e.preventDefault();
    // Implement login logic here 
    navigate('/dashboard');
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="login-container d-flex bg-white rounded-4 shadow w-75 overflow-hidden">
        {/* Lado esquerdo - logo */}
        <div className="logo-side d-flex flex-column justify-content-center align-items-center bg-white w-50 p-4">
          <img src={logo} alt="PlayTorneios logo" className="img-fluid" style={{ maxHeight: '800px' }} />
        </div>

        {/* Lado direito - formulário */}
        <div className="form-side bg-success text-white w-50 p-5 d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-1 text-center">Login</h2>
          <p className="mb-4 text-center">Organizando o seu torneio da melhor forma</p>

          <form onSubmit={handleLoginClick} className="w-100">
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input type="email" className="form-control" placeholder="Digite seu email" />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <input type="password" className="form-control" placeholder="Digite a sua senha" />
            </div>
            <button type="submit" className="btn btn-success w-100 mt-2 bg-white text-success fw-bold">
              Login
            </button>
            <button onClick={handleRegisterClick} type='button' className="btn btn-sucess w-100 mt-2 bg-black text-success fw-bold">
              Cadastrar-se
            </button>
            <div className="mt-3">
              <a  className="text-white text-decoration-underline">Esqueceu a sua senha?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
