import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { rentApi } from "../services/api"; // Import the rentApi functions

const RentPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [renting, setRenting] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await rentApi.getRentableAssets();
        setAssets(data);
      } catch (error) {
        setError("Failed to load assets");
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  const handleRent = async (assetId) => {
    setRenting(true);
    try {
      await rentApi.rentAsset(assetId);
      alert("Asset rented successfully");
      // Optionally, refresh the asset list or provide additional feedback
    } catch (error) {
      setError("Failed to rent asset");
    } finally {
      setRenting(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Rent Assets</h2>
      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {assets.map((asset) => (
          <Col xs={12} md={6} lg={4} key={asset.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={asset.image || "https://via.placeholder.com/150"}
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
                  disabled={renting}
                >
                  {renting ? (
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
    </Container>
  );
};

export default RentPage;
