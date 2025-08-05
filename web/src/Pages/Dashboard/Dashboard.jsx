import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import NewTournament from '../../components/NewTournament';

const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogoutClick = (e) => {
        e.preventDefault();
        // Implement logout logic here
        navigate('/');
    };    

    return (
        <>        
        <div className='bg-secondary d-flex'>
            <Header />
            <Sidebar />
            <NewTournament />
        </div>
        
        </>
    ); 

}

export default Dashboard;