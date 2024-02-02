const ethers = require("ethers");

const contractAddresses = {
    landRegistration: '0xf035980af1977C1861F9e967A34238f0cc7B03AD',
    vehicleRegistration: '0x5844768909FCE8f0024924f85A6Db2F500433b4d',
};

const contractABIs = {
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
};


const contracts = {};

const initContracts = async () => {
    try {
        const { landRegistration, vehicleRegistration } = contractAddresses;
        const { landRegistration: landRegistrationABI, vehicleRegistration: vehicleRegistrationABI } = contractABIs;

        const landRegistrationContract = new ethers.Contract(landRegistration, landRegistrationABI);
        const vehicleRegistrationContract = new ethers.Contract(vehicleRegistration, vehicleRegistrationABI);

        contracts.landRegistration = landRegistrationContract;
        contracts.vehicleRegistration = vehicleRegistrationContract;
        // Add other contracts...
    } catch (error) {
        console.error('Error initializing contracts:', error);
    }
};

initContracts();

module.exports = { ethers, contractAddresses, contractABIs, contracts };