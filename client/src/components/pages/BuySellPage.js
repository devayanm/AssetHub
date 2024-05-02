import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Col, Form, Modal, Dropdown, Pagination, Badge, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { FaBitcoin, FaEthereum, FaArrowDown, FaArrowLeft, FaArrowUp } from 'react-icons/fa';
import { buysellApi } from '../services/api';

const generateSampleData = (numProducts) => {
    const categories = ['Real Estate', 'Vehicles', 'Properties'];
    const products = [];

    for (let i = 1; i <= numProducts; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        let name, description, price, image;

        switch (category) {
            case 'Real Estate':
                name = `Real Estate ${i}`;
                description = 'Description for property';
                price = Math.floor(Math.random() * 1000000) + 50000;
                image = 'path/to/real_estate_image.jpg';
                break;
            case 'Vehicles':
                name = `Vehicle ${i}`;
                description = 'Description for vehicle';
                price = Math.floor(Math.random() * 100000) + 1000;
                image = 'path/to/vehicle_image.jpg';
                break;
            case 'Properties':
                name = `Property ${i}`;
                description = 'Description for property';
                price = Math.floor(Math.random() * 5000000) + 100000;
                image = 'path/to/property_image.jpg';
                break;
            default:
                name = `Product ${i}`;
                description = 'Description for product';
                price = Math.floor(Math.random() * 1000) + 50;
                image = 'path/to/default_image.jpg';
        }

        products.push({
            id: i,
            name,
            description,
            price,
            category,
            image
        });
    }

    return products;
};

const BuySellAssetsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    const [isSampleData, setIsSampleData] = useState(false);
    const [mode, setMode] = useState('buying'); // buying or selling
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
    const [errorModalShown, setErrorModalShown] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await (isSampleData ? generateSampleData(180) : buysellApi.getData());
            setProducts(response);
            setFilteredProducts(response);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error.message);
            setError(error.message);
            setShowErrorModal(true);
            setErrorModalShown(true);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    const handleSort = () => {
        const sorted = [...filteredProducts].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setFilteredProducts(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSwitchToSampleData = () => {
        setIsSampleData(true);
        setShowErrorModal(false);
        setErrorModalShown(true);
        fetchSampleData();
    };

    const fetchSampleData = async () => {
        try {
            const sampleData = generateSampleData(50);
            setProducts(sampleData);
            setFilteredProducts(sampleData);
            setError(null);
        } catch (error) {
            console.error('Error generating sample data:', error);
            setError('Error generating sample data.');
            setShowErrorModal(true);
        }
    };


    const handleSwitchToRealData = () => {
        setIsSampleData(false);
        setShowErrorModal(false);
        setProducts([]);
        setFilteredProducts([]);
    };

    const handleModeChange = (value) => {
        setMode(value);
        setSearchQuery('');
        setCurrentPage(1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddProduct = () => {
        console.log('New Product:', newProduct);
    };

    return (
        <div className="container mt-5">
            {isSampleData ? (
                <div className="text-center mt-3">
                    <Badge bg="danger">Sample Data Displayed</Badge>
                </div>
            ) : (
                <div className="text-center mt-3">
                    <Badge bg="danger">Failed to Fetch Data</Badge>
                </div>
            )}
            <h1 className="mb-4 text-center">Buy/Sell Assets</h1>

            <div className='mb-5'>
                <Col xs={12} md={4} lg={3} className="mb-3 mb-md-0">
                    <Link to="/explore" className="btn btn-outline-success">
                        <FaArrowLeft className="me-2" /> Back to Explore
                    </Link>
                </Col>
            </div>

            {isSampleData && !errorModalShown && (
                <div className="text-center">
                    <Button variant="secondary" onClick={handleSwitchToRealData}>Switch to Real Data Mode</Button>
                </div>
            )}
            <div className="btn-group" role="group" aria-label="Buy/Sell Toggle">
                <button
                    type="button"
                    className={`btn ${mode === 'buying' ? 'btn-success' : 'btn-outline-success'} btn-sm me-1 rounded-pill`}
                    onClick={() => handleModeChange('buying')}
                >
                    Buy Asset
                    {mode === 'buying' && <span className="badge bg-light text-dark position-absolute top-0 start-50 translate-middle badge-rounded-pill">Selected</span>}
                </button>
                <button
                    type="button"
                    className={`btn ${mode === 'selling' ? 'btn-success' : 'btn-outline-success'} btn-sm ms-1 rounded-pill`}
                    onClick={() => handleModeChange('selling')}
                >
                    Sell Asset
                    {mode === 'selling' && <span className="badge bg-light text-dark position-absolute top-0 start-50 translate-middle badge-rounded-pill">Selected</span>}
                </button>
            </div>

            {isSampleData && mode === 'selling' && (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter product description"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
                </Form>
            )}

            {isSampleData && mode === 'buying' && (
                <React.Fragment>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Filter by Category
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleCategorySelect('')}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect('Real Estate')}>Real Estate</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect('Vehicles')}>Vehicles</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleCategorySelect('Properties')}>Properties</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="secondary" onClick={handleSort}>
                            Sort by Price {sortOrder === 'asc' ? '▲' : '▼'}
                        </Button>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {currentProducts.map(product => (
                            <div key={product.id} className="col">
                                <Card>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>{product.description}</Card.Text>
                                        <Card.Text>Price: ${product.price}</Card.Text>
                                        <Button variant="primary">Buy Now</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <Pagination className="mt-3">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </React.Fragment>
            )}
            <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSwitchToSampleData}>
                        Switch to Sample Data Mode
                    </Button>
                    <Button variant="danger" onClick={handleSwitchToRealData}>
                        Real Data Mode
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BuySellAssetsPage;
