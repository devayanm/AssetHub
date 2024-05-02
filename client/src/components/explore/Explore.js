import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch, FaShoppingBag, FaRegHandshake, FaScroll, FaGavel, FaCoins, FaGem } from "react-icons/fa";
import images from "../../constants/images";


const Explore = () => {
  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for assets..."
              aria-label="Search for assets"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-success" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </div>
      </div>
      <h1 className="mb-4 text-center">Explore Assets</h1>
      <div className="row">
        <div className="col-md-3 mb-4">
          <Card className="h-100 shadow" style={{ maxWidth: "300px", margin: "auto" }}>
            <Card.Img variant="top" src={images.explore1} alt="Buy/Sell Assets" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="text-center">Buy/Sell Assets</Card.Title>
              <Card.Text className="text-center">
                Explore assets available for buying or selling.
              </Card.Text>
              <div className="text-center">
                <Link to="/buy-sell" className="btn btn-outline-success">
                  <FaShoppingBag className="me-1" /> Buy/Sell
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 mb-4">
          <Card className="h-100 shadow" style={{ maxWidth: "300px", margin: "auto" }}>
            <Card.Img variant="top" src={images.explore2} alt="Rent Assets" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="text-center">Rent Assets</Card.Title>
              <Card.Text className="text-center">
                Browse assets available for rent or list your assets for rent.
              </Card.Text>
              <div className="text-center">
                <Link to="/rent" className="btn btn-outline-success">
                  <FaRegHandshake className="me-1" /> Rent Now
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 mb-4">
          <Card className="h-100 shadow" style={{ maxWidth: "300px", margin: "auto" }}>
            <Card.Img variant="top" src={images.explore3} alt="Register Assets" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="text-center">Register Assets</Card.Title>
              <Card.Text className="text-center">
                Register your assets for official record-keeping or ownership transfer.
              </Card.Text>
              <div className="text-center">
                <Link to="/register" className="btn btn-outline-success">
                  <FaScroll className="me-1" /> Register Now
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 mb-4">
          <Card className="h-100 shadow" style={{ maxWidth: "300px", margin: "auto" }}>
            <Card.Img variant="top" src={images.explore4} alt="Auction Assets" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="text-center">Auction Assets</Card.Title>
              <Card.Text className="text-center">
                Participate in asset auctions or list your assets for auction.
              </Card.Text>
              <div className="text-center">
                <Link to="/auction" className="btn btn-outline-success">
                  <FaGavel className="me-1" /> Participate
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 mb-4">
          <Card className="h-100 shadow" style={{ maxWidth: "300px", margin: "auto" }}>
            <Card.Img variant="top" src={images.goldImage} alt="Gold" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="text-center">Gold</Card.Title>
              <Card.Text className="text-center">
                Invest in virtual gold assets.
              </Card.Text>
              <div className="text-center">
                <Link to="/gold" className="btn btn-outline-success">
                  <FaGem className="me-1" /> Invest
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 mb-4">
          <Card className="h-100 shadow" style={{ maxWidth: "300px", margin: "auto" }}>
            <Card.Img variant="top" src={images.cryptoImage} alt="Cryptocurrency" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="text-center">Cryptocurrency</Card.Title>
              <Card.Text className="text-center">
                Invest in virtual cryptocurrency assets.
              </Card.Text>
              <div className="text-center">
                <Link to="/crypto" className="btn btn-outline-success">
                  <FaCoins className="me-1" /> Invest
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;
