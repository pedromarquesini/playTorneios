 import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrophy, faSignOutAlt, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import './Style.css';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column bg-success bg-gradient text-white vh-100 nav-position rounded-3 shadow">
        <nav className="nav flex-column mt-4 ">
        <Link to="/dashboard" className="nav-link text-white">
          <FontAwesomeIcon icon={faHome} className="me-2" />
          Dashboard
        </Link>
        <Link to="/NewTournament" className="nav-link text-white">
          <FontAwesomeIcon icon={faTrophy} className="me-2" />
          Meus Torneios
        </Link>
        <Link to="/NewTeam" className="nav-link text-white">
          <FontAwesomeIcon icon={faPeopleGroup} className="me-2" />
          Times
        </Link>
        <Link to="/" className="nav-link text-danger mt-auto">
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Sair
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
