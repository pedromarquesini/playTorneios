import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import NewTournament from '../../components/NewTournament';
import NewTeam from '../../components/NewTeam';

const Dashboard = () => {
    const navigate = useNavigate();
    

    return (
        <>        
        <div className='bg-secondary d-flex'>
            <Header />
            <Sidebar />
            <div className='bg-primary vh-100'></div>
        </div>
        
        </>
    ); 

}

export default Dashboard;