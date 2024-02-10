import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import LandRegistrationForm from "./components/forms/LandRegistrationForm";
import VehicleRegistrationForm from "./components/forms/VehicleRegistrationForm";
import LandMarketplace from "./components/marketplace/LandMarketplace";
import VehicleMarketplace from "./components/marketplace/VehicleMarketplace";
import LandRenting from "./components/renting/LandRenting";
import VehicleRenting from "./components/renting/VehicleRenting";
import LandAuction from "./components/auction/LandAuction";
import VehicleAuction from "./components/auction/VehicleAuction";
import UserProfile from "./components/profile/UserProfile";
import Dashboard from "./components/dashboard/Dashboard.js";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { landRegistrationContract, vehicleRegistrationContract } from "./contractConfig"; // Import your contract
const ethers = require("ethers");

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const loadProvider = async () => {
      try {
        if (provider) {
          window.ethereum.on("accountsChanged", () => window.location.reload());
          window.ethereum.on("chainChanged", () => window.location.reload());
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          const landContract = new ethers.Contract(
            landRegistrationContract.address,
            landRegistrationContract.abi,
            signer
          );

          const vehicleContract = new ethers.Contract(
            vehicleRegistrationContract.address,
            vehicleRegistrationContract.abi,
            signer
          );

          setContract({ landContract, vehicleContract });
          setProvider(provider);
        } else {
          alert("Metamask is not installed in your browser :(");
        }
      } catch (error) {
        console.log(error);
      }
    };

    provider && loadProvider();
  }, []); 
  const links = [
    { url: "#home", text: "home" },
    { url: "#about", text: "about us" },
    { url: "#explore", text: "explore" },
    { url: "#dashboard", text: "dashboard" },
    { url: "#contact", text: "contact us" }
];


  return (
    <div className="App">
        <div>
          <Navbar links={links} />
        </div>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
