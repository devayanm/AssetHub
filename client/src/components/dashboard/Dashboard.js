import React, { useEffect, useState } from "react";
import { Button, Alert, Spinner, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';
import AssetsSection from './Assets';
import OfficialRecordsSection from './Records';
import LicensesSection from './Licenses';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await userApi.getCurrentUser();
      setUserData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await userApi.logoutUser();
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError('Error logging out: ' + error.message);
    }
  };

  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
      <div className="container">
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Card className="text-center m-5 p-5" >
            <Card.Body>
              <h2>Welcome {userData.username && capitalizeFirstLetter(userData.username)}</h2>
              <p className="mb-4">to your personalized Dashboard</p>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        <AssetsSection />
        <OfficialRecordsSection />
        <LicensesSection />
        {/* <ComplianceStatusSection data={data.complianceStatus} />
        <TaxInformationSection data={data.taxInformation} />
        <LegalNoticesSection data={data.legalNotices} />
        <RenewalRemindersSection data={data.renewalReminders} />
        <GovernmentServicesSection data={data.governmentServices} />
        <EducationalResourcesSection data={data.educationalResources} /> */}
        {/* Render other section components */}
      </div>
    </div>
  );
}

export default Dashboard;
