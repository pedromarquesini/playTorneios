import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Header from './components/Header';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebar from './components/Sidebar';
import NewTeam from './components/NewTeam';
import NewTournament from './components/NewTournament';
import MyTournaments from './Pages/MyTournaments/MyTournaments';
import CompetitionPage from './Pages/CompetitionPage/CompetitionPage';
import MyTeamsPage from './Pages/MyTeams/MyTeams';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/NewTeam" element={
        <div className='bg-secondary d-flex'>
          <Header />
          <Sidebar />
          <NewTeam />
        </div>
      } />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/NewTournament" element={
        <div className='bg-secondary d-flex'>
          <Header />
          <Sidebar />
          <NewTournament />
        </div>
      } />
      <Route path='/MyTournaments' element={
        <div className='bg-secondary d-flex '>
          <Header />
          <Sidebar />
          <MyTournaments />
        </div>
      } />
      {/* --- 2. Adicione a Rota Corretamente --- */}
      <Route path='/MyTeams' element={
          <div className='bg-secondary d-flex '>
              <Header />
              <Sidebar />
              <MyTeamsPage />
          </div>
      } />
      <Route path="/competicao/:id" element={<CompetitionPage />} />
    </Routes>
  )
}

export default App;