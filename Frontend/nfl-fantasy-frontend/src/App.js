import React from 'react'; 
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Navbar from './pages/Components/Navbar/navbar';
import Home from './pages/Home/home';
import AllTeams from './pages/AllTeams/all_teams';
import TeamPage from './pages/TeamPage/team_page';
import AllPositions from './pages/AllPositions/all_positions';
import PositionPage from './pages/PositionPage/position_page';
import Search from './pages/Search/search';
import FullSchedule from './pages/FullSchedule/full_schedule';
import RegisterForm from './pages/Registration/register_form';
import LoginForm from './pages/Login/login_form';
import VerifyFail from './pages/Verification/verify_fail';
import VerifySuccess from './pages/Verification/verify_success';
import ResetPassword from './pages/ResetPassword/reset_password';
import CreateNewPassword from './pages/ResetPassword/create_new_password';
import HotTakes from './pages/HotTakes/hot_takes';


function App() {
  return (
    <Router>
      {/* Navigation Menu Bar that shows at the top of every page */}
      <Navbar />

      {/* Background styling and all routes */}
      <div 
        style={{ 
          paddingTop: "60px", 
          background: "#53c68c",
          minHeight: "100vh"
        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all_teams" element={<AllTeams />} />
          <Route path="/all_teams/:teamName" element={<TeamPage />} /> 
          <Route path="/all_positions" element={<AllPositions />} />
          <Route path="/position_page" element={<PositionPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/full_schedule" element={<FullSchedule />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/verify_fail" element={<VerifyFail />} />
          <Route path="/verify_success" element={<VerifySuccess />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/create_new_password/:username/:token" element={<CreateNewPassword />} />
          <Route path="/hot_takes" element={<HotTakes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;