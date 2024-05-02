import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { userApi } from '../services/api';

function LicensesSection() {
    const [expanded, setExpanded] = useState(false);
    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Simulating API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Sample data for licenses
                const sampleLicenses = [
                    {
                        id: 1,
                        authority: 'Department of Motor Vehicles',
                        type: 'Driver\'s License',
                        validity: '2024-12-31',
                        status: 'Active',
                    },
                    {
                        id: 2,
                        authority: 'Federal Aviation Administration',
                        type: 'Pilot License',
                        validity: '2025-06-30',
                        status: 'Active',
                    },
                    {
                        id: 3,
                        authority: 'Food and Drug Administration',
                        type: 'Pharmacist License',
                        validity: '2023-09-15',
                        status: 'Expired',
                    },
                    // Add more sample licenses as needed
                ];
                setLicenses(sampleLicenses);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        }
        fetchData();

        return () => {
            // Cleanup function
        };
    }, []);

    return (
        <Card className="mb-3">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <span className="mr-3">Licenses</span>
                    </div>
                    <Button
                        variant="link"
                        size="sm"
                        onClick={handleToggleExpand}
                    >
                        {expanded ? <FaAngleUp /> : <FaAngleDown />}
                    </Button>
                </div>
            </Card.Header>
            {expanded && (
                <Card.Body>
                    {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    ) : error ? (
                        <Alert variant="danger">{error}</Alert>
                    ) : (
                        <ul>
                            {licenses.map((license, index) => (
                                <li key={index}>
                                    <p>Issuing Authority: {license.authority}</p>
                                    <p>Type: {license.type}</p>
                                    <p>Validity: {license.validity}</p>
                                    <p>Status: {license.status}</p>
                                    {/* Add more details as needed */}
                                </li>
                            ))}
                        </ul>
                    )}
                </Card.Body>
            )}
        </Card>
    );
}

export default LicensesSection;
