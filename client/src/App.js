import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar.js";
import Footer from "./components/footer/Footer.js";
import RoutesConfig from "./routes.js";
import { landRegistrationContract, vehicleRegistrationContract } from "./contractConfig.js";
const ethers = require("ethers");


function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const links = [
    { url: "#home", text: "home" },
    { url: "#about", text: "about us" },
    { url: "#explore", text: "explore" },
    { url: "#dashboard", text: "dashboard" },
    { url: "#contact", text: "contact us" }
  ];

  return (
    <div className="App">
      <Navbar links={links} />
      <RoutesConfig contract={contract} />
      <Footer />
    </div>
  );
}

export default App;
