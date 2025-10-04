import React from 'react'; 
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Navbar from './pages/Components/Navbar/navbar';
import Home from './pages/Home/home';
import AllTeams from './pages/AllTeams/all_teams';
import TeamPage from './pages/TeamPage/team_page';
import FullSchedule from './pages/FullSchedule/full_schedule';

function App() {
  return (
    <Router>
      {/* Navigation Menu Bar that shows at the top of every page */}
      <Navbar />

      {/* Background styling and all routes */}
      <div 
        style={{ 
          paddingTop: "60px", 
          background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
          minHeight: "100vh"
        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all_teams" element={<AllTeams />} />
          <Route path="/all_teams/:teamName" element={<TeamPage />} /> 
          <Route path="/full_schedule" element={<FullSchedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;