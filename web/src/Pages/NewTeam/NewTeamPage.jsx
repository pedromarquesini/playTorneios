import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import NewTournament from '../../components/NewTournament';
import NewTeam from '../../components/NewTeam';

const NewTeam = () => {
    const navigate = useNavigate();
    

    return (
        <>        
        <div className='bg-secondary d-flex'>
            <Header />
            <Sidebar />
            <NewTeam />
        </div>
        
        </>
    ); 

}

export default Dashboard;