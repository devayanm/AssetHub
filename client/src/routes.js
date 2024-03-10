import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.js";
import SignIn from "./components/auth/SignIn.js";
import SignUp from "./components/auth/SignUp.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import LandRegistrationForm from "./components/forms/LandRegistrationForm.js";
import VehicleRegistrationForm from "./components/forms/VehicleRegistrationForm.js";
import LandMarketplace from "./components/marketplace/LandMarketplace.js";
import VehicleMarketplace from "./components/marketplace/VehicleMarketplace.js";
import LandRenting from "./components/renting/LandRenting.js";
import VehicleRenting from "./components/renting/VehicleRenting.js";
import LandAuction from "./components/auction/LandAuction.js";
import VehicleAuction from "./components/auction/VehicleAuction.js";
import UserProfile from "./components/profile/UserProfile.js";
import Explore from "./components/explore/Explore.js";
import ProtectedRoute from './components/ProtectedRoute';

const RoutesConfig = ({ contract }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/explore" element={<ProtectedRoute> <Explore /> </ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
            <Route
                path="/land-registration"
                element={<LandRegistrationForm contract={contract?.landContract} />}
            />
            <Route
                path="/vehicle-registration"
                element={<VehicleRegistrationForm contract={contract?.vehicleContract} />}
            />
            <Route
                path="/land-marketplace"
                element={<LandMarketplace contract={contract?.landContract} />}
            />
            <Route
                path="/vehicle-marketplace"
                element={<VehicleMarketplace contract={contract?.vehicleContract} />}
            />
            <Route
                path="/land-renting"
                element={<LandRenting contract={contract?.landContract} />}
            />
            <Route
                path="/vehicle-renting"
                element={<VehicleRenting contract={contract?.vehicleContract} />}
            />
            <Route
                path="/land-auction"
                element={<LandAuction contract={contract?.landContract} />}
            />
            <Route
                path="/vehicle-auction"
                element={<VehicleAuction contract={contract?.vehicleContract} />}
            />
            
        </Routes>
    );
};

export default RoutesConfig;
