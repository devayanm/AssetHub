import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Dropdown, Pagination, Badge } from 'react-bootstrap';
import { buysellApi } from '../services/api';

const generateSampleData = (numProducts) => {
    const categories = ['Real Estate', 'Vehicles', 'Properties'];
    const products = [];

    for (let i = 1; i <= numProducts; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        let name, description, price, image;

        switch (category) {
            case 'Real Estate':
                name = `Property ${i}`;
                description = 'Description for property';
                price = Math.floor(Math.random() * 1000000) + 50000;
                image = 'path/to/real_estate_image.jpg';
                break;
            case 'Vehicles':
                name = `Vehicle ${i}`;
                description = 'Description for vehicle';
                price = Math.floor(Math.random() * 100000) + 1000; // Random price between 1000 and 100000
                image = 'path/to/vehicle_image.jpg';
                break;
            case 'Properties':
                name = `Property ${i}`;
                description = 'Description for property';
                price = Math.floor(Math.random() * 5000000) + 100000; // Random price between 100000 and 5000000
                image = 'path/to/property_image.jpg';
                break;
            default:
                name = `Product ${i}`;
                description = 'Description for product';
                price = Math.floor(Math.random() * 1000) + 50; // Random price between 50 and 1000
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
    const [productsPerPage] = useState(9); // Number of products to display per page
    const [isSampleData, setIsSampleData] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await buysellApi.getBuySellAssets();
            setProducts(response.data);
            setFilteredProducts(response.data);
            setIsSampleData(false); // Reset sample data flag if real data is fetched successfully
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error.message);
            setError(error.message);
            setShowErrorModal(true);
            setIsSampleData(true); // Set sample data flag
            const sampleData = generateSampleData(20);
            setProducts(sampleData);
            setFilteredProducts(sampleData);
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

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            {isSampleData && (
                <div className="text-center mt-3">
                    <Badge bg="danger">Sample Data Displayed</Badge>
                </div>
            )}
            <h1 className="mb-4 text-center">Buy/Sell Assets</h1>
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
            <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseErrorModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BuySellAssetsPage;