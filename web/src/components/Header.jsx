import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className="app-header justify-content-between d-flex align-items-center p-3" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1030 }}>
            <div>
                <Link to="/dashboard">
                    <img src={logo2} alt="PlayTorneios logo" style={{ maxHeight: '40px' }} />
                </Link>
            </div>
            <div>
                <FontAwesomeIcon icon={faBell} className="ms-3" style={{ cursor: 'pointer', fontSize: '1.3rem' }} />
                <FontAwesomeIcon icon={faUser} className="ms-3" style={{ cursor: 'pointer', fontSize: '1.3rem' }} />
            </div>
        </header>
    );
};

export default Header;