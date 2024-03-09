import React from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Explore Assets</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title text-center">Buy/Sell Assets</h5>
              <p className="card-text text-center">Explore assets available for buying or selling.</p>
              <div className="text-center">
                <Link to="/buy-sell" className="btn btn-primary" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title text-center">Rent Assets</h5>
              <p className="card-text text-center">Browse assets available for rent or list your assets for rent.</p>
              <div className="text-center">
                <Link to="/rent" className="btn btn-primary" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title text-center">Register Assets</h5>
              <p className="card-text text-center">Register your assets for official record-keeping or ownership transfer.</p>
              <div className="text-center">
                <Link to="/register" className="btn btn-primary" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title text-center">Auction Assets</h5>
              <p className="card-text text-center">Participate in asset auctions or list your assets for auction.</p>
              <div className="text-center">
                <Link to="/auction" className="btn btn-primary" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
                  Participate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
