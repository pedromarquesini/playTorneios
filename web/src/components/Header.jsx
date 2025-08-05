import { Link } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
    return (
        <div className="bg-white text-black justify-content-between d-flex align-items-center p-3" style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
            <div>
                <img src={logo2} alt="PlayTorneios logo" className="img-fluid mb" style={{ maxHeight: '40px' }} />
            </div>
            <div>
                <h1 className="h4">PlayTorneios</h1>
            </div>
            <div>
                <Link to="/dashboard" className="btn btn-secondary">Adicionar Competição</Link>
                <FontAwesomeIcon icon={faBell} className="ms-3" style={{ cursor: 'pointer', fontSize: '1rem' }} />
                <FontAwesomeIcon icon={faUser} className="ms-3" style={{ cursor: 'pointer', fontSize: '1rem' }} />
            </div>
        </div>
    );

}

export default Header;