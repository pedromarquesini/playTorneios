import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import NewTeam from './components/NewTeam';
import NewTournament from './components/NewTournament';
import MyTournaments from './Pages/MyTournaments/MyTournaments';
import CompetitionPage from './Pages/Competition/CompetitionPage';
import MyTeamsPage from './Pages/MyTeams/MyTeamsPage';
import TeamManagementPage from './Pages/TeamManagement/TeamManagementPage';
import TeamProfilePage from './Pages/TeamProfile/TeamProfilePage';
import MatchPage from './Pages/MatchPage/MatchPage';
import Layout from './components/Layout';
import PlayerProfilePage from './Pages/PlayerProfile/PlayerProfilePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/NewTeam" element={<Layout><NewTeam /></Layout>} />
        <Route path="/NewTournament" element={<Layout><NewTournament /></Layout>} />
        <Route path="/MyTournaments" element={<Layout><MyTournaments /></Layout>} />
        <Route path="/MyTeams" element={<Layout><MyTeamsPage /></Layout>} />
        <Route path="/competicao/:id" element={<Layout><CompetitionPage /></Layout>} />
        <Route path="/partida/:id" element={<Layout><MatchPage /></Layout>} />
        <Route path="/time/:id/perfil" element={<Layout><TeamProfilePage /></Layout>} />
        <Route path="/time/:id/gerenciar" element={<Layout><TeamManagementPage /></Layout>} />
        
        <Route path="/jogador/:id/perfil" element={<Layout><PlayerProfilePage /></Layout>} />

        <Route path="*" element={<h1>404: Página Não Encontrada</h1>} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
}

export default App;