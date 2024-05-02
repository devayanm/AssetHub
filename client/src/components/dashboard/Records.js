import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Spinner, Modal, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaDownload, FaInfoCircle } from 'react-icons/fa';

// Sample data for demonstration
const sampleRecords = [
    { id: 1, name: 'Property Deed Certificate', type: 'Real Estate', location: 'New York', date: '2024-05-10' },
    { id: 2, name: 'Vehicle Registration Certificate', type: 'Vehicle', location: 'California', date: '2024-05-12' },
    { id: 3, name: 'Land Registration Certificate', type: 'Property', location: 'Texas', date: '2024-05-15' },
    { id: 4, name: 'Gold Investment Certificate', type: 'Virtual Asset', location: 'Online', date: '2024-05-18' },
    
];

function OfficialRecordsSection() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Simulating API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                // For now, using sample data
                setRecords(sampleRecords);
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            }
            setLoading(false);
        }
        fetchData();

        return () => {
            // Cleanup function
        };
    }, []);

    const handleDownloadRecord = (recordId) => {
        // Handle download logic here
    };

    const handleShowDetails = (record) => {
        setSelectedRecord(record);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedRecord(null);
        setShowModal(false);
    };

    const renderTooltip = (text) => (
        <Tooltip>{text}</Tooltip>
    );

    return (
        <Card className="d-flex justify-content-center m-4 ">
            <Card.Header>
                <h4 className="mb-0">Official Records</h4>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center m-2">
                <Row>
                    {records.map((record, index) => (
                        <Col key={index} xs={6} md={4} lg={3}>
                            <Card className="mb-3 record-card" onClick={() => handleShowDetails(record)}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <OverlayTrigger placement="top" overlay={renderTooltip(`Location: ${record.location}, Date: ${record.date}`)}>
                                                <p>{record.name}</p>
                                            </OverlayTrigger>
                                            <p className="text-muted">{record.type}</p>
                                        </div>
                                        <Button variant="link" size="sm" onClick={(e) => { e.stopPropagation(); handleDownloadRecord(record.id) }}>
                                            <FaDownload />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card.Body>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedRecord?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Type: {selectedRecord?.type}</p>
                    <p>Location: {selectedRecord?.location}</p>
                    <p>Date: {selectedRecord?.date}</p>
                    {/* Add more details as needed */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default OfficialRecordsSection;
