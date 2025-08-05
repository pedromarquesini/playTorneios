import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Header from './components/Header';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (    
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />   
        <Route path="/Dashboard" element={<Dashboard />} />     
    </Routes>
  )
}

export default App;
