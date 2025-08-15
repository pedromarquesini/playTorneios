import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrophy, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Style.css';

const Sidebar = () => {
  return (
    <aside className="d-flex flex-column bg-success bg-gradient text-white vh-100 nav-position shadow">
        <nav className="nav flex-column mt-4 p-2">
            <Link to="/dashboard" className="nav-link text-white sidebar-link">
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Dashboard
            </Link>
            <Link to="/MyTournaments" className="nav-link text-white sidebar-link">
                <FontAwesomeIcon icon={faTrophy} className="me-2" />
                Meus Torneios
            </Link>
            <Link to="/MyTeams" className="nav-link text-white sidebar-link">
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Meus Times
            </Link>
        </nav>
        <div className="mt-auto p-2">
            <Link to="/" className="nav-link text-white sidebar-link">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Sair
            </Link>
        </div>
    </aside>
  );
};

export default Sidebar;