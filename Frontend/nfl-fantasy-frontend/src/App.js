import React from 'react'; 
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';
import TeamPage from './pages/TeamPage';
import Positions from './pages/Positions';

function App() {
  return (
    <Router>

      <nav style={{ padding: "20px", background: "#eee"}}>
        <Link to="/" style={{ marginRight: "30px" }}>Home</Link>
        <Link to="/teams" style={{ marginRight: "30px" }}>Teams</Link>
        <Link to="/positions">Positions</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamName" element={<TeamPage />} />
        <Route path="/positions" element={<Positions />} />
      </Routes>

    </Router>
  );
}

export default App;

