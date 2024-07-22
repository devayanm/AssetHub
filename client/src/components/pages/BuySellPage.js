import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Col,
  Form,
  Modal,
  Dropdown,
  Pagination,
  Badge,
  Spinner,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { buysellApi } from "../services/api";
import { generateSampleData } from "../services/mockdata";

const BuySellAssetsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [isSampleData, setIsSampleData] = useState(false);
  const [mode, setMode] = useState("buying"); // buying or selling
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [mode, isSampleData]);

  const fetchProducts = async () => {
    setLoading(true); // Show loading spinner
    try {
      const response = isSampleData
        ? generateSampleData(180)
        : await buysellApi.getData();

      if (Array.isArray(response)) {
        setProducts(response);
        setFilteredProducts(response);
        setError(null);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError(isSampleData ? null : "Failed to fetch real data.");
      setShowErrorModal(true);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleSort = () => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.category &&
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
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSwitchToSampleData = () => {
    setIsSampleData(true);
    fetchProducts();
  };

  const handleSwitchToRealData = async () => {
    setIsSampleData(false);
    await fetchProducts();
  };

  const handleModeChange = (value) => {
    setMode(value);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    // Implement product addition logic here if needed
    console.log("New Product:", newProduct);
  };

  return (
    <div className="container mt-5">
      {loading && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <Spinner animation="border" role="status" className="m-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <div className="text-center mt-3">
        {error ? (
          <Badge bg="danger">Failed to Fetch Real Data</Badge>
        ) : isSampleData ? (
          <Badge bg="success">Sample Data Displayed</Badge>
        ) : (
          <Badge bg="success">Real Data Displayed</Badge>
        )}
      </div>
      <h1 className="mb-4 text-center">Buy/Sell Assets</h1>

      <div className="mb-5">
        <Col xs={12} md={4} lg={3} className="mb-3 mb-md-0">
          <Link to="/explore" className="btn btn-outline-success">
            <FaArrowLeft className="me-2" /> Back to Explore
          </Link>
        </Col>
      </div>

      {isSampleData ? (
        <div className="text-center mb-3">
          <Button variant="secondary" onClick={handleSwitchToRealData}>
            Switch to Real Data Mode
          </Button>
        </div>
      ) : (
        <div className="text-center mb-3">
          <Button variant="secondary" onClick={handleSwitchToSampleData}>
            Switch to Sample Data Mode
          </Button>
        </div>
      )}

      <div className="btn-group mb-3" role="group" aria-label="Buy/Sell Toggle">
        <button
          type="button"
          className={`btn ${
            mode === "buying" ? "btn-success" : "btn-outline-success"
          } btn-sm me-1 rounded-pill`}
          onClick={() => handleModeChange("buying")}
        >
          Buy Asset
          {mode === "buying" && (
            <span className="badge bg-light text-dark position-absolute top-0 start-50 translate-middle badge-rounded-pill">
              Selected
            </span>
          )}
        </button>
        <button
          type="button"
          className={`btn ${
            mode === "selling" ? "btn-success" : "btn-outline-success"
          } btn-sm ms-1 rounded-pill`}
          onClick={() => handleModeChange("selling")}
        >
          Sell Asset
          {mode === "selling" && (
            <span className="badge bg-light text-dark position-absolute top-0 start-50 translate-middle badge-rounded-pill">
              Selected
            </span>
          )}
        </button>
      </div>

      {mode === "selling" ? (
        isSampleData && (
          <Form className="mb-4">
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
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Form>
        )
      ) : (
        <>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Group>

          <div className="mb-3">
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary">
                Categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  as="button"
                  onClick={() => handleCategorySelect("")}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => handleCategorySelect("Vehicle")}
                >
                  Vehicle
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => handleCategorySelect("Property")}
                >
                  Property
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => handleCategorySelect("Electronics")}
                >
                  Electronics
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="mb-3">
            <Button variant="outline-secondary" onClick={handleSort}>
              Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </Button>
          </div>

          {currentProducts.length > 0 ? (
            <div className="row">
              {currentProducts.map((product, index) => (
                <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>${product.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}

          <Pagination>
            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}

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
