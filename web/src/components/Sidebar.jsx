import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrophy, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <aside 
            className="d-flex flex-column text-white vh-100 shadow-lg" 
            style={{
                backgroundColor: '#198754',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '220px',
                paddingTop: '70px'
            }}
        >
            <nav className="nav flex-column p-2">
                <Link to="/dashboard" className="nav-link text-white sidebar-link" style={{ backgroundColor: isActive('/dashboard') ? 'rgba(0,0,0,0.2)' : 'transparent' }}>
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    Dashboard
                </Link>
                <Link to="/MyTournaments" className="nav-link text-white sidebar-link" style={{ backgroundColor: isActive('/MyTournaments') ? 'rgba(0,0,0,0.2)' : 'transparent' }}>
                    <FontAwesomeIcon icon={faTrophy} className="me-2" />
                    Meus Torneios
                </Link>
                <Link to="/MyTeams" className="nav-link text-white sidebar-link" style={{ backgroundColor: isActive('/MyTeams') ? 'rgba(0,0,0,0.2)' : 'transparent' }}>
                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                    Meus Times
                </Link>
            </nav>

            <div className="mt-auto p-2">
                <button onClick={handleLogout} className="nav-link sidebar-logout-btn btn btn-link w-100 text-start">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Sair
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;