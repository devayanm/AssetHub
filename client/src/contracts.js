import { useState, useEffect } from 'react';
import { useWeb3 } from 'react-web3-hook';

const useContractConfiguration = () => {
    const [web3, accounts, connect] = useWeb3('http://127.0.0.1:7545');

    const [contractAddresses, setContractAddresses] = useState({
        landRegistration: '0xf035980af1977C1861F9e967A34238f0cc7B03AD',
        vehicleRegistration: '0x5844768909FCE8f0024924f85A6Db2F500433b4d',
    });

    const [contractABIs, setContractABIs] = useState({
        landRegistration: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "landOwners",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "landId",
                        "type": "uint256"
                    }
                ],
                "name": "registerLand",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        vehicleRegistration: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "vehicleOwners",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "vehicleId",
                        "type": "uint256"
                    }
                ],
                "name": "registerVehicle",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        // Add other contract ABIs...
    });

    const [contracts, setContracts] = useState({});

    useEffect(() => {
        const initContracts = async () => {
            try {
                // Load your contract ABIs and addresses
                const { landRegistration, vehicleRegistration } = contractAddresses;
                const { landRegistration: landRegistrationABI, vehicleRegistration: vehicleRegistrationABI } = contractABIs;

                // Create new contract instances
                const landRegistrationContract = new web3.eth.Contract(landRegistrationABI, landRegistration);
                const vehicleRegistrationContract = new web3.eth.Contract(vehicleRegistrationABI, vehicleRegistration);

                // Set the contracts state
                setContracts({
                    landRegistration: landRegistrationContract,
                    vehicleRegistration: vehicleRegistrationContract,
                    // Add other contracts
                });
            } catch (error) {
                console.error('Error initializing contracts:', error);
            }
        };

        if (web3) {
            initContracts();
        }
    }, [web3, contractAddresses, contractABIs]);

    console.log("web3", web3);
    console.log("accounts", accounts);
    console.log("contracts", contracts);


    return { web3, accounts, connect, contracts };
};

export default useContractConfiguration;
