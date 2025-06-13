import React, { useEffect, useState } from 'react';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Plant from './pages/Plant';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Inventory from './pages/Inventory';
import ForgotPassword from "./components/Auth/ForgotPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/Auth/ResetPassword";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    const stored = localStorage.getItem('isLoggedIn');
    if (stored === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleRegister = (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const alreadyExists = existingUsers.find(user => user.email === userData.email);
    if (alreadyExists) {
      alert("User with this email already exists.");
      return;
    }
    existingUsers.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
    setShowRegister(false);
  };

  return (
    <Router>
      <Routes>
        {/* Forgot Password route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Show Register Page if not logged in and user clicks "Register" */}
        {!isLoggedIn && showRegister && (
          <Route
            path="*"
            element={<RegisterForm onRegister={handleRegister} onBackToLogin={() => setShowRegister(false)} />}
          />
        )}

        {/* Show Login Page if not logged in */}
        {!isLoggedIn && !showRegister && (
          <Route
            path="*"
            element={<LoginForm onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />}
          />
        )}

        {/* Show Dashboard if logged in */}
        {isLoggedIn && (
          <Route
            path="*"
            element={
              <div className="flex min-h-screen bg-gray-100">
                <Sidebar setCurrentView={setCurrentView} currentView={currentView} onLogout={handleLogout} />
                <div className="flex-1 p-6">
                  {currentView === 'dashboard' && <Dashboard />}
                  {currentView === 'plant' && <Plant />}
                  {currentView === 'alerts' && <Alerts />}
                  {currentView === 'reports' && <Reports />}
                  {currentView === 'settings' && <Settings />}
                  {currentView === 'profile' && <Profile />}
                  {currentView === 'inventory' && <Inventory />}
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
