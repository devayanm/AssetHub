import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { Modal } from 'react-bootstrap';

const MetaMaskButtons = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkMetaMaskConnection = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                window.ethereum.on('accountsChanged', (accounts) => {
                    if (accounts.length > 0) {
                        setIsConnected(true);
                        setAccount(accounts[0]);
                        localStorage.setItem('walletState', JSON.stringify({ isConnected: true, account: accounts[0] }));
                    } else {
                        setIsConnected(false);
                        setAccount(null);
                        localStorage.removeItem('walletState');
                    }
                });

                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setIsConnected(true);
                    setAccount(accounts[0]);
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
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setIsConnected(true);
                setAccount(accounts[0]);
                localStorage.setItem('walletState', JSON.stringify({ isConnected: true, account: accounts[0] }));
                alert('MetaMask connected successfully!');
            } else {
                setError('No accounts found in MetaMask. Please make sure you have at least one account available.');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to connect to MetaMask. Please try again.');
        }
    };

    const handleDisconnectMetaMask = async () => {
        try {
            await window.ethereum.request({ method: 'eth_accounts' });
            setIsConnected(false);
            setAccount(null);
            localStorage.removeItem('walletState');
            alert('MetaMask disconnected successfully!');
        } catch (error) {
            console.error(error);
            setError('Failed to disconnect from MetaMask. Please try again.');
        }
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
                    className="btn btn-outline-success"
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
            
