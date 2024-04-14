import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { FaBitcoin, FaEthereum, FaArrowDown, FaArrowLeft, FaArrowUp } from 'react-icons/fa';
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
    const [useSampleData, setUseSampleData] = useState(false);

    useEffect(() => {
        fetchCryptoAssets();
    }, [useSampleData]);

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
            if (!useSampleData) {
                setInvestmentError('Failed to fetch real data. Switched to sample data mode.');
                setUseSampleData(true);
            }
        }
    };

    const generateMockData = () => {
        const data = [];
        const cryptoNames = ['Bitcoin', 'Ethereum', 'Binance Coin', 'Cardano', 'Solana', 'Ripple', 'Litecoin', 'Chainlink', 'Polkadot', 'Stellar', 'VeChain', 'Filecoin', 'Tron', 'Monero', 'Dash'];

        for (let i = 0; i < 100; i++) {
            const randomNameIndex = Math.floor(Math.random() * cryptoNames.length);
            const name = cryptoNames[randomNameIndex];
            const symbol = name.substring(0, 3).toUpperCase();
            const price = Math.floor(Math.random() * 10000) + 100;
            const marketCap = Math.floor(Math.random() * 100000000000) + 1000000000;
            const change24h = (Math.random() * 20 - 10);
            const volume = Math.floor(Math.random() * 10000000000) + 100000000;
            const circulatingSupply = Math.floor(Math.random() * 1000000000) + 1000000;
            const highPrice = price * (1 + Math.random() * 0.1);
            const lowPrice = price * (1 - Math.random() * 0.1);
            const icon = change24h > 0 ? <FaArrowUp className="text-success" /> : <FaArrowDown className="text-danger" />;

            data.push({
                id: i + 1,
                name,
                symbol,
                price,
                marketCap,
                change24h,
                volume,
                circulatingSupply,
                highPrice,
                lowPrice,
                icon,
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
        if (useSampleData) {
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
            <Row className="mb-4 align-items-center">
                <Col xs={12} md={4} lg={3} className="mb-3 mb-md-0">
                    <Link to="/explore" className="btn btn-outline-success">
                        <FaArrowLeft className="me-2" /> Back to Explore
                    </Link>
                </Col>
                <Col xs={12} md={8} lg={6} className="mb-3 mb-md-0">
                    <Form.Control
                        type="text"
                        placeholder="Search crypto assets..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="rounded-pill"
                    />
                </Col>
                <Col xs={12} md={8} lg={3} className="d-flex justify-content-end">
                    <button
                        type="button"
                        className={`btn ${useSampleData ? 'btn-success' : 'btn-outline-success'} btn-sm me-1 rounded-pill position-relative`}
                        onClick={() => setUseSampleData(true)}
                    >
                        Sample Data
                        {useSampleData && <span className="badge bg-light text-dark position-absolute top-0 start-50 translate-middle badge-rounded-pill">Selected</span>}
                    </button>
                    <button
                        type="button"
                        className={`btn ${!useSampleData ? 'btn-success' : 'btn-outline-success'} btn-sm ms-1 rounded-pill`}
                        onClick={() => setUseSampleData(false)}
                    >
                        Real Data
                        {!useSampleData && <span className="badge bg-light text-dark position-absolute top-0 start-50 translate-middle badge-rounded-pill">Selected</span>}
                    </button>
                </Col>
            </Row>
            <h1 className="mb-4 text-center">Crypto Investment Options</h1>
            {investmentError && !useSampleData && (
                <div className="text-danger text-center">
                    <p>{investmentError}</p>
                </div>
            )}
            {!loading && !investmentError && filteredAssets.length > 0 && (
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
                                    <td>
                                        {asset.icon} {asset.change24h.toFixed(2)}%
                                    </td>

                                    <td>
                                        <Button variant="success" onClick={() => handleInvest(asset)}>
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
                </>
            )}
            {!loading && !investmentError && filteredAssets.length === 0 && (
                <div className="text-center">
                    <p>No Crypto assets found.</p>
                </div>
            )}
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
