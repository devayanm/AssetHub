import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { Modal, Button } from 'react-bootstrap';

const MetaMaskButtons = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkMetaMaskConnection = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                const { selectedAddress } = window.ethereum;
                if (selectedAddress) {
                    setIsConnected(true);
                    setAccount(selectedAddress);
                } else {
                    setIsConnected(false);
                    setAccount(null);
                }
            } else {
                setIsConnected(false);
                setAccount(null);
            }
        };

        const storedWalletState = JSON.parse(localStorage.getItem('walletState'));
        if (storedWalletState && storedWalletState.isConnected && storedWalletState.account) {
            setIsConnected(true);
            setAccount(storedWalletState.account);
        }

        checkMetaMaskConnection();
    }, []);

    const handleConnectMetaMask = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const selectedAddress = window.ethereum.selectedAddress;
            setIsConnected(true);
            setAccount(selectedAddress);
            localStorage.setItem('walletState', JSON.stringify({ isConnected: true, account: selectedAddress }));
            alert('MetaMask connected successfully!');
        } catch (error) {
            console.error(error);
            setError('Failed to connect to MetaMask. Please try again.');
        }
    };

    const handleDisconnectMetaMask = () => {
        setIsConnected(false);
        setAccount(null);
        localStorage.removeItem('walletState');
        alert('MetaMask disconnected successfully!');
    };

    const handleCloseErrorModal = () => {
        setError(null);
    };

    return (
        <div className="container text-center mt-5">
            {isConnected ? (
                <>
                    <p>Connected with account:</p>
                    <p>{account}</p>
                    <button
                        className="btn btn-danger"
                        onClick={handleDisconnectMetaMask}
                    >
                        Disconnect Wallet
                    </button>
                </>
            ) : (
                <button
                    className="btn btn-outline-primary"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    onClick={handleConnectMetaMask}
                >
                    Connect Wallet
                </button>
            )}
            <Modal show={!!error} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-outline-danger"
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        onClick={handleCloseErrorModal}
                    >
                        Disconnect Wallet
                    </button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MetaMaskButtons;
