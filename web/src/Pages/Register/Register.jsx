import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import '../Login/Login.css';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('PUBLICO');

    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        const payload = {
            nome,
            email,
            senha,
            role
        };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/registrar', payload);
            if (response.status === 201) {
                toast.success('Usuário registrado com sucesso! Por favor, faça o login.');
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.success(`Erro: ${error.response.data}`);
            } else {
                toast.success('Ocorreu um erro no registro.');
            }
            console.error("Erro no registro:", error);
        }
    };

    return (
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
            <div className="login-container d-flex bg-white rounded-4 shadow w-75 overflow-hidden">
                <div className="logo-side d-flex flex-column justify-content-center align-items-center bg-white w-50 p-4">
                    <img src={logo} alt="PlayTorneios logo" className="img-fluid" style={{ maxHeight: '800px' }} />
                </div>

                <div className="form-side bg-success text-white w-50 p-5 d-flex flex-column justify-content-center">
                    <h2 className="fw-bold mb-1 text-center">Cadastro</h2>
                    <p className="mb-4 text-center">Já possui uma conta? Faça o <a href='#' onClick={handleLoginClick} className='text-reset'>Login</a></p>

                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label text-white">Nome</label>
                            <input type="text" className="form-control" placeholder="Digite seu nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-white">Email</label>
                            <input type="email" className="form-control" placeholder="Digite seu email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-white">Senha</label>
                            <input type="password" className="form-control" placeholder="Digite sua senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-white">Eu sou:</label>
                            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="PUBLICO">Público / Torcedor</option>
                                <option value="ORGANIZADOR">Organizador de Competições</option>
                                <option value="REPRESENTANTE_TIME">Representante de Time</option>
                                <option value="JOGADOR">Jogador</option>
                            </select>
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