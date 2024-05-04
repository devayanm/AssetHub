import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const WalletButtons = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);
    const [isLoadingConnect, setIsLoadingConnect] = useState(false);
    const [isLoadingDisconnect, setIsLoadingDisconnect] = useState(false);

    useEffect(() => {
        const checkWalletConnection = async () => {
            const provider = window.ethereum;
            if (provider) {
                try {
                    const accounts = await provider.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setIsConnected(true);
                        setAccount(accounts[0]);
                        localStorage.setItem('walletState', JSON.stringify({ isConnected: true, account: accounts[0] }));
                    } else {
                        setIsConnected(false);
                        setAccount(null);
                        localStorage.removeItem('walletState');
                    }
                } catch (error) {
                    setIsConnected(false);
                    setAccount(null);
                    localStorage.removeItem('walletState');
                    console.error('Error connecting to wallet:', error);
                }
            } else {
                setIsConnected(false);
                setAccount(null);
                localStorage.removeItem('walletState');
            }
        };

        const interval = setInterval(checkWalletConnection, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleConnectWallet = async () => {
        setIsLoadingConnect(true);
        try {
            const provider = window.ethereum;
            if (provider) {
                await provider.request({ method: 'eth_requestAccounts' });
                const accounts = await provider.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setIsConnected(true);
                    setAccount(accounts[0]);
                    localStorage.setItem('walletState', JSON.stringify({ isConnected: true, account: accounts[0] }));
                    alert('Wallet connected successfully!');
                } else {
                    setError('No accounts found in wallet. Please make sure you have at least one account available.');
                }
            } else {
                setError('Wallet provider not detected. Please make sure you have a compatible wallet installed.');
            }
        } catch (error) {
            console.error('Failed to connect to wallet:', error);
            setError('Failed to connect to wallet. Please try again.');
        }
        setIsLoadingConnect(false);
    };

    const handleDisconnectWallet = async () => {
        setIsLoadingDisconnect(true);
        setError("Disconnecting the wallet from the website is not supported. Please disconnect manually from your wallet application.");
        checkConnectionStatus();
    };


    const handleCloseErrorModal = () => {
        setError(null);
    };

    const checkConnectionStatus = async () => {
        const provider = window.ethereum;
        if (provider) {
            try {
                const accounts = await provider.request({ method: 'eth_accounts' });
                if (accounts.length === 0) {
                    setIsConnected(false);
                    setAccount(null);
                    localStorage.removeItem('walletState');
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error checking wallet connection:', error);
            }
        }
    };

    return (
        <div className="container text-center mt-5">
            {isConnected && account ? (
                <>
                    <p>Connected with account:</p>
                    <p>{account}</p>
                    <button
                        className="btn btn-danger"
                        onClick={handleDisconnectWallet}
                    >
                        {isLoadingDisconnect ? 'Disconnecting...' : 'Disconnect Wallet'}
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
                    onClick={handleConnectWallet}
                >
                    {isLoadingConnect ? 'Connecting...' : 'Connect Wallet'}
                </button>
            )}
            <Modal show={!!error} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-outline-primary"
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        onClick={handleCloseErrorModal}
                    >
                        OK
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default WalletButtons;
