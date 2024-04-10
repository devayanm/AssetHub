import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
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
