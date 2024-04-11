import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userApi.logoutUser();
      navigate('/auth/signin'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
