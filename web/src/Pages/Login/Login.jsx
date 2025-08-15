import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleRegisterClick = (e) => {
        e.preventDefault();
        navigate('/Register');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !senha) {
            toast.warn('Por favor, preencha o email e a senha.');
            return;
        }

        const payload = { email, senha };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', payload);
            if (response.status === 200) {
                toast.success('Login realizado com sucesso!');
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error('Email ou senha inválidos. Tente novamente.');
            console.error("Erro no login:", error);
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
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label text-white">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-white">Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Digite a sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 mt-2 bg-white text-success fw-bold">
                            Login
                        </button>
                        <button onClick={handleRegisterClick} type='button' className="btn btn-dark w-100 mt-2">
                            Ainda não tem conta? Cadastre-se
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;