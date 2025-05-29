import React from 'react'; 
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home/home';
import AllTeams from './pages/AllTeams/all_teams';
import TeamPage from './pages/TeamPage/team_page';
import AllPositions from './pages/AllPositions/all_positions';
import PositionPage from './pages/PositionPage/position_page';
import Search from './pages/Search/search';
import FullSchedule from './pages/FullSchedule/full_schedule';

function App() {
  return (
    <Router>

      <nav style={{ padding: "20px", background: "#eee"}}>
        <Link to="/" style={{ marginRight: "30px" }}>Home</Link>
        <Link to="/full_schedule" style={{ marginRight: "30px" }}>Schedule</Link>
        <Link to="/all_teams" style={{ marginRight: "30px" }}>Teams</Link>
        <Link to="/all_positions" style={{ marginRight: "30px" }}>Stats by Positions</Link>
        <Link to="/search" style={{ marginRight: "30px" }}>Player Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all_teams" element={<AllTeams />} />
        <Route path="/all_teams/:teamName" element={<TeamPage />} /> 
        <Route path="/all_positions" element={<AllPositions />} />
        <Route path="/all_positions/:positionName" element={<PositionPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/full_schedule" element={<FullSchedule />} />
      </Routes>

    </Router>
  );
}

export default App;

