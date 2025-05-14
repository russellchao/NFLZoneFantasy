import React from 'react'; 
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home/home';
import Teams from './pages/Teams/teams';
import TeamPage from './pages/TeamPage/team_page';
import Positions from './pages/Positions/positions';
import PositionPage from './pages/PositionPage/position_page';
import Search from './pages/Search/search';

function App() {
  return (
    <Router>

      <nav style={{ padding: "20px", background: "#eee"}}>
        <Link to="/" style={{ marginRight: "30px" }}>Home</Link>
        <Link to="/teams" style={{ marginRight: "30px" }}>Teams</Link>
        <Link to="/positions" style={{ marginRight: "30px" }}>Positions</Link>
        <Link to="/search" style={{ marginRight: "30px" }}>Player Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamName" element={<TeamPage />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/positions/:positionName" element={<PositionPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>

    </Router>
  );
}

export default App;

