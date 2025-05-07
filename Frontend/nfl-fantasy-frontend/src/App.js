import React from 'react'; 
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';

function App() {
  return (
    <Router>

      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/teams">Teams</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>

    </Router>
  );
}

export default App;
