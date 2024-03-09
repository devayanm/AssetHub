import React from "react";
import { Button } from "react-bootstrap";

const ConnectWalletButton = () => {
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed in your browser.");
                return;
            }

            await window.ethereum.request({ method: "eth_requestAccounts" });
            alert("MetaMask connected successfully!");
        } catch (error) {
            console.error("Error connecting MetaMask:", error);
            alert("An error occurred while connecting MetaMask.");
        }
    };

    return (
        <Button
            variant="outline-primary"
            className="w-100 mt-3"
            onClick={connectWallet}
            style={{ borderRadius: "0.5rem", fontWeight: "bold" }}
        >
            Connect Wallet
        </Button>
    );
};

export default ConnectWalletButton;
