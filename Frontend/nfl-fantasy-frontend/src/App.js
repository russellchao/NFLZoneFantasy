import React from 'react'; 
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

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

import { useAuth } from './hooks/auth_context';
import { AuthProvider } from './hooks/auth_context';



function App() {
  const { isLoggedIn, username, logout } = useAuth(); 

  return (
    <AuthProvider>

      <Router>

        <nav style={{ 
          padding: "20px", 
          background: "#004d26",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ marginRight: "30px", color: "#ffffff" }}>Home</Link>
            <Link to="/full_schedule" style={{ marginRight: "30px", color: "#ffffff" }}>Schedule</Link>
            <Link to="/all_teams" style={{ marginRight: "30px", color: "#ffffff" }}>Teams</Link>
            <Link to="/all_positions" style={{ marginRight: "30px", color: "#ffffff" }}>Positions</Link>
            <Link to="/search" style={{ marginRight: "30px", color: "#ffffff" }}>Player Search</Link>
          </div>

          {/* Login section */}
          <div style={{ marginLeft: "auto", marginRight: "50px" }}>
            {isLoggedIn ? (
              <>
                <span style={{ color: "#ffffff" }}>Welcome, {username}</span>
                <button 
                  onClick={logout}
                  style={{
                    padding: '5px',
                    marginLeft: '15px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: "#ffffff", marginRight: "15px" }}>Log In</Link>
                <Link to="/register" style={{ color: "#ffffff" }}>Register</Link>
              </>
            )}

            {/* <Link to="/login" style={{ color: "#ffffff" }}>Login</Link> */}
          </div>

        </nav>

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
          </Routes>
        </div>

      </Router>

    </AuthProvider>
  );
}

export default App;

