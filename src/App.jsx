import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './components/css/App.css';

import Header from './components/header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Job from './pages/Job';
import Community from './pages/Community';
import Company from './pages/Company';
import Salary from './pages/Salary';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<Job />} />
            <Route path="/company" element={<Company />} />
            <Route path="/employer" element={<Company />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
