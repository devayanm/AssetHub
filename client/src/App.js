import React, { useEffect, useState, Suspense, lazy } from "react";
// import { landRegistrationContract, vehicleRegistrationContract } from "./contractConfig.js";
import Loader from "./components/loader/Loader.js"
const ethers = require("ethers");

const Navbar = lazy(() => import("./components/navbar/Navbar.js"));
const Footer = lazy(() => import("./components/footer/Footer.js"));
const RoutesConfig = lazy(() => import("./routes.js"));

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
      <Suspense fallback={<Loader />}>
        <Navbar links={links} />
        <RoutesConfig contract={contract} />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
