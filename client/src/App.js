import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar.js";
import Footer from "./components/footer/Footer.js";
import { landRegistrationContract, vehicleRegistrationContract } from "./contractConfig.js"; // Import your contract
import RoutesConfig from "./routes.js";
const ethers = require("ethers");

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const loadProvider = async () => {
      try {
        if (!window.ethereum) {
          alert("Metamask is not installed in your browser :(");
          return;
        }

        window.ethereum.on("accountsChanged", () => {
          provider.send("eth_requestAccounts", []).then(() => window.location.reload());
        });

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
      } catch (error) {
        console.log(error);
      }
    };

    loadProvider();
  }, [provider]);

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
