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
import VerifyUser from './pages/Verification/verify_user';
import ResetPassword from './pages/ResetPassword/reset_password';
import CreateNewPassword from './pages/ResetPassword/create_new_password';
import HotTakes from './pages/HotTakes/hot_takes';
import PredictTheWinner from './pages/PredictTheWinner/predict_the_winner';
import Notifications from './pages/Notifications/notifications';


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
          <Route path="/all_positions" element={<AllPositions />} />
          <Route path="/position_page" element={<PositionPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/full_schedule" element={<FullSchedule />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/verify_user/:token" element={<VerifyUser />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/create_new_password/:username/:token" element={<CreateNewPassword />} />
          <Route path="/hot_takes" element={<HotTakes />} />
          <Route path="/predict_the_winner" element={<PredictTheWinner />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;