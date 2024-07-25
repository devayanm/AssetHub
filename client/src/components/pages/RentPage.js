import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
  Pagination,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { rentApi } from "../services/api";
import { generateSampleRentData } from "../services/mockdata";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import images from "../../constants/images";

const RentPage = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [renting, setRenting] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [assetsPerPage] = useState(9);
  const [isSampleData, setIsSampleData] = useState(false);
  const [badgeMessage, setBadgeMessage] = useState("");

  useEffect(() => {
    fetchAssets();
  }, [isSampleData, currentPage, category, searchQuery]);

  const fetchAssets = async () => {
    setLoading(true);
    setError("");
    setBadgeMessage("Loading...");
    try {
      const response = isSampleData
        ? generateSampleRentData(180)
        : await rentApi.getRentableAssets();

      if (Array.isArray(response)) {
        let data = response;

        if (category) {
          data = data.filter(
            (asset) => asset.category.toLowerCase() === category.toLowerCase()
          );
        }

        if (searchQuery) {
          data = data.filter((asset) =>
            asset.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setAssets(data);
        setFilteredAssets(data);
        setBadgeMessage(
          isSampleData ? "Sample Data Displayed" : "Real Data Displayed"
        );
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      setError("Failed to load assets");
      setAssets([]);
      setFilteredAssets([]);
      setBadgeMessage("Failed to Fetch Real Data");
    } finally {
      setLoading(false);
    }
  };

  const handleRent = async (assetId) => {
    setRenting(assetId);
    try {
      await rentApi.rentAsset(assetId);
      alert("Asset rented successfully");
      fetchAssets();
    } catch (error) {
      setError("Failed to rent asset");
    } finally {
      setRenting(null);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    setCurrentPage(1);
  };

  const handleSwitchToSampleData = () => {
    setIsSampleData(true);
  };

  const handleSwitchToRealData = () => {
    setIsSampleData(false);
  };

  const indexOfLastAsset = currentPage * assetsPerPage;
  const indexOfFirstAsset = indexOfLastAsset - assetsPerPage;
  const currentAssets = filteredAssets.slice(
    indexOfFirstAsset,
    indexOfLastAsset
  );
  const totalPages = Math.ceil(filteredAssets.length / assetsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="my-5">
      <div
        className="hero-section text-center p-5 mb-4"
        style={{
          background:
            'url("/path-to-background-image.jpg") no-repeat center center',
          backgroundSize: "cover",
        }}
      >
        <h1 className="display-4">Discover and Rent Your Ideal Asset</h1>
        <p className="lead">
          Browse through a wide range of assets available for rent.
        </p>
      </div>

      <div className="text-center mb-4">
        <Badge bg={error ? "danger" : "success"}>{badgeMessage}</Badge>
      </div>

      <div className="mb-5">
        <Col xs={12} md={4} lg={3} className="mb-3 mb-md-0">
          <Link to="/explore" className="btn btn-outline-success">
            <FaArrowLeft className="me-2" /> Back to Explore
          </Link>
        </Col>
      </div>

      <div className="mb-4 text-center">
        {isSampleData ? (
          <Button variant="secondary" onClick={handleSwitchToRealData}>
            Switch to Real Data Mode
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleSwitchToSampleData}>
            Switch to Sample Data Mode
          </Button>
        )}
      </div>

      <Form.Group className="mb-3 d-flex align-items-center">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="me-2"
        />
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
      </Form.Group>

      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="outline-secondary">
          <MdFilterList /> Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button" onClick={() => handleCategorySelect("")}>
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
            onClick={() => handleCategorySelect("Real Estate")}
          >
            Real Estate
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {loading ? (
        <div className="d-block mx-auto">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {error && !isSampleData && (
            <div className="alert alert-danger text-center mb-4" role="alert">
              {error}
            </div>
          )}
          <Row>
            {currentAssets.length === 0 && !error && !loading && (
              <div className="alert alert-info text-center" role="alert">
                No assets found.
              </div>
            )}
            {currentAssets.map((asset) => (
              <Col xs={12} md={6} lg={4} key={asset.id} className="mb-4">
                <Card className="shadow-sm border-light">
                  <Card.Img
                    variant="top"
                    src={asset.image}
                    alt={asset.name}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = images.placeholder;
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{asset.name}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {asset.location}
                      <br />
                      <strong>Description:</strong> {asset.description}
                      <br />
                      <strong>Price per day:</strong> ${asset.pricePerDay}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleRent(asset.id)}
                      disabled={renting === asset.id}
                      className="w-100"
                    >
                      {renting === asset.id ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Rent Now"
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mb-4">
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </>
      )}
    </Container>
  );
};

export default RentPage;
