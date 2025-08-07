import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Header from './components/Header';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebar from './components/Sidebar';
import NewTeam from './components/NewTeam';
import NewTournament from './components/NewTournament';
import MyTournaments from './Pages/MyTournaments/MyTournaments';

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
        <>
          <div className='bg-secondary d-flex'>
            <Header />
            <Sidebar />
            <NewTournament />
          </div>
        </>
      } />
      <Route path='/MyTournaments' element={
        <>
          <div className='bg-secondary d-flex '>
            <Header />
            <Sidebar />
            <MyTournaments />
          </div>
        </>
      } />     

    </Routes>
  )
}

export default App;
