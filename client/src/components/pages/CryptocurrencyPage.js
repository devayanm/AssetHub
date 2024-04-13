import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col, Table, Form, Modal } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { cryptoApi } from '../services/api';

const CryptoPage = () => {
    const [cryptoAssets, setCryptoAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [assetsPerPage] = useState(10);
    const [investAmount, setInvestAmount] = useState('');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [investmentError, setInvestmentError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [sampleDataInvesting, setSampleDataInvesting] = useState(false);
    const [useSampleData, setUseSampleData] = useState(false);

    useEffect(() => {
        fetchCryptoAssets();
    }, []);

    useEffect(() => {
        filterAndSortAssets();
    }, [cryptoAssets, searchQuery, sortBy, sortOrder]);

    const fetchCryptoAssets = async () => {
        try {
            setLoading(true);
            if (useSampleData) {
                setCryptoAssets(generateMockData());
                setLoading(false);
            } else {
                const response = await cryptoApi.getCryptoAssets();
                setCryptoAssets(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching crypto assets:', error);
            setLoading(false);
            setInvestmentError('Failed to fetch real data. Switched to sample data mode.');
            setUseSampleData(true);
        }
    };

    const generateMockData = () => {
        const data = [];
        for (let i = 1; i <= 100; i++) {
            data.push({
                id: i,
                name: `Crypto Asset ${i}`,
                price: Math.floor(Math.random() * 10000) + 100,
                marketCap: Math.floor(Math.random() * 1000000) + 1000,
                change24h: Math.random() * 20 - 10,
                volume: Math.floor(Math.random() * 100000) + 100,
                circulatingSupply: Math.floor(Math.random() * 1000000) + 100,
                highPrice: Math.floor(Math.random() * 10000) + 100,
                lowPrice: Math.floor(Math.random() * 100) + 1,
            });
        }
        return data;
    };

    const filterAndSortAssets = () => {
        const filtered = cryptoAssets.filter(asset =>
            asset.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const sorted = filtered.sort((a, b) => {
            const keyA = a[sortBy];
            const keyB = b[sortBy];
            if (keyA < keyB) return sortOrder === 'asc' ? -1 : 1;
            if (keyA > keyB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredAssets(sorted);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (sortBy) => {
        setSortBy(sortBy);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastAsset = currentPage * assetsPerPage;
    const indexOfFirstAsset = indexOfLastAsset - assetsPerPage;
    const currentAssets = filteredAssets.slice(indexOfFirstAsset, indexOfLastAsset);

    const handleInvest = (asset) => {
        setSelectedAsset(asset);
        setShowConfirmationModal(true);
    };

    const handleSubmitInvest = () => {
        if (sampleDataInvesting) {
            setInvestmentError('Investing in sample data is not allowed.');
            setShowConfirmationModal(false);
            return;
        }
        // Your investment logic goes here
        setShowConfirmationModal(false);
        setSuccessMessage(`Successfully invested ${investAmount} USD in ${selectedAsset.name}.`);
        setSelectedAsset(null);
        setInvestAmount('');
    };

    const handleCancelInvestment = () => {
        setShowConfirmationModal(false);
        setInvestAmount('');
    };

    const validateInvestmentAmount = (amount) => {
        return !isNaN(parseFloat(amount)) && isFinite(amount) && amount > 0;
    };

    const toggleSampleData = () => {
        setUseSampleData(prevState => !prevState);
        setInvestmentError('');
        setSuccessMessage('');
    };

    return (
        <div className="container mt-5">
            <Row className="mb-4">
                <Col>
                    <Link to="/explore" className="btn btn-outline-primary">
                        <FaArrowLeft className="me-2" /> Back to Explore
                    </Link>
                </Col>
                <Col className="text-end">
                    <Form>
                        <Form.Check
                            type="switch"
                            id="sampleDataToggle"
                            label={useSampleData ? "Sample Data" : "Real Data"}
                            checked={useSampleData}
                            onChange={toggleSampleData}
                        />
                    </Form>
                    <Form.Group className="mb-0">
                        <Form.Control
                            type="text"
                            placeholder="Search crypto assets..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <h1 className="mb-4 text-center">Crypto Investment Options</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {filteredAssets.length === 0 ? (
                        <p>No crypto assets found.</p>
                    ) : (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('name')}>Name</th>
                                        <th onClick={() => handleSort('price')}>Price (USD)</th>
                                        <th onClick={() => handleSort('marketCap')}>Market Cap (USD)</th>
                                        <th onClick={() => handleSort('change24h')}>Change (24h)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentAssets.map((asset, index) => (
                                        <tr key={index}>
                                            <td>{asset.name}</td>
                                            <td>${asset.price.toFixed(2)}</td>
                                            <td>${asset.marketCap.toLocaleString()}</td>
                                            <td>{asset.change24h.toFixed(2)}%</td>
                                            <td>
                                                <Button variant="primary" onClick={() => handleInvest(asset)}>
                                                    Invest
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination
                                assetsPerPage={assetsPerPage}
                                totalAssets={filteredAssets.length}
                                paginate={paginate}
                            />
                            <ConfirmationModal
                                show={showConfirmationModal}
                                handleClose={handleCancelInvestment}
                                handleConfirm={handleSubmitInvest}
                                investAmount={investAmount}
                                setInvestAmount={setInvestAmount}
                                validateInvestmentAmount={validateInvestmentAmount}
                                setInvestmentError={setInvestmentError}
                            />
                            {investmentError && (
                                <Modal show={true} onHide={() => setInvestmentError(null)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Error</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{investmentError}</Modal.Body>
                                </Modal>
                            )}
                            {successMessage && (
                                <Modal show={true} onHide={() => setSuccessMessage('')}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Success</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{successMessage}</Modal.Body>
                                </Modal>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

const Pagination = ({ assetsPerPage, totalAssets, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalAssets / assetsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const ConfirmationModal = ({
    show,
    handleClose,
    handleConfirm,
    investAmount,
    setInvestAmount,
    validateInvestmentAmount,
    setInvestmentError,
    investmentError,
}) => {
    const handleChange = (e) => {
        setInvestAmount(e.target.value);
    };

    const handleSubmit = () => {
        if (!validateInvestmentAmount(investAmount)) {
            setInvestmentError('Please enter a valid investment amount.');
        } else {
            handleConfirm();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Investment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>How much would you like to invest?</p>
                <Form.Control
                    type="number"
                    value={investAmount}
                    onChange={handleChange}
                    placeholder="Enter investment amount"
                />
                {investmentError && <p className="text-danger">{investmentError}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Invest
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CryptoPage;
