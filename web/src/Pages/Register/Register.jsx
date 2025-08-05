import '../Login/Login.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'

const Register = () => {

  const navigate = useNavigate();
  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/');
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

          <form>

            <div className="mb-3">
              <label className="form-label text-white">Nome</label>
              <input type="email" className="form-control" placeholder="Digite seu nome" />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input type="email" className="form-control" placeholder="Digite seu seu email" />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <input type="password" className="form-control" placeholder="Digite a sua senha" />
            </div>

            <div className='mb-3'>
              <input type="checkbox" className='me-2'/>
              <label className='form-label text-white'>Aceito os termos de serviço</label>
            </div>

            <button type="submit" className="btn btn-success w-100 mt-2 bg-white text-success fw-bold">
              Cadastrar
            </button>            
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
