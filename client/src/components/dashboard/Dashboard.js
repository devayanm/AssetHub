// components/Dashboard.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { logout } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <Button variant="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
