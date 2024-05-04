import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner, Alert, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaAngleDown, FaAngleUp, FaInfoCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';

const sampleAssets = [
    {
        id: 1,
        name: 'Land',
        type: 'Real Estate',
        currentOwner: 'John Doe',
        previousOwner: 'Jane Doe',
        valuation: '$500,000',
        status: 'Active',
        location: 'New York, USA',
    },
    {
        id: 2,
        name: 'Vehicle',
        type: 'Automobile',
        currentOwner: 'John Doe',
        previousOwner: 'Jane Doe',
        valuation: '$30,000',
        status: 'Active',
        make: 'Tesla',
        model: 'Model S',
        year: 2022,
    },
    {
        id: 3,
        name: 'House',
        type: 'Real Estate',
        currentOwner: 'John Doe',
        previousOwner: 'Jane Doe',
        valuation: '$700,000',
        status: 'Inactive',
        location: 'Los Angeles, USA',
    },
];

function AssetCard({ asset, onDelete }) {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div style={{ display: 'inline-block', margin: '10px' }}>
            <Card
                style={{
                    width: '18rem',
                    cursor: 'pointer',
                    transform: showDetails ? 'translateZ(50px)' : 'translateZ(0)',
                    transition: 'transform 0.3s ease-in-out',
                    position: 'relative',
                }}

            >
                <Card.Body onClick={handleToggleDetails}>
                    <Card.Title>{asset.name}</Card.Title>
                    <Card.Text>{asset.type}</Card.Text>
                    {!showDetails && <Card.Img variant="top" src="https://via.placeholder.com/150" />}
                    {showDetails && (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <h5>Details</h5>
                            </div>
                            <p>Current Owner: {asset.currentOwner}</p>
                            <p>Previous Owner: {asset.previousOwner}</p>
                            <p>Valuation: {asset.valuation}</p>
                            <p>Status: {asset.status}</p>
                            <p>Year: {asset.year}</p>
                            <p>Location: {asset.location}</p>
                        </>
                    )}
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`edit-tooltip-${asset.id}`}>Edit</Tooltip>}
                            >
                                <Button variant="link" size="sm">
                                    <FaEdit />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`delete-tooltip-${asset.id}`}>Delete</Tooltip>}
                            >
                                <Button variant="link" size="sm" onClick={() => onDelete(asset.id)}>
                                    <FaTrashAlt />
                                </Button>
                            </OverlayTrigger>
                        </div>
                        <Button variant="link" size="sm" onClick={handleToggleDetails}>
                            {showDetails ? 'Hide Details' : 'Show Details'}
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
}

function AssetsSection() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Simulating API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                // For now, using sample data
                setAssets(sampleAssets);
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleDeleteAsset = (id) => {
        // Implement delete functionality here
        console.log('Deleting asset with ID:', id);
    };

    return (
        <Card className="m-5">
            <Card.Body className="p-3 m-3 ">
                <h3>Assets</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {assets.map((asset) => (
                    <AssetCard className="d-flex justify-content-center" key={asset.id} asset={asset} onDelete={handleDeleteAsset} />
                ))}
            </Card.Body>
        </Card>
    );
}

export default AssetsSection;
