# Asset Registration Project

## Overview

This decentralized application (DApp) enables users to register and manage assets like land and vehicles on the Ethereum blockchain. It utilizes smart contracts for secure, transparent, and tamper-proof asset registration. The frontend, built with React.js, provides an intuitive user interface, making it accessible to users interacting with the Ethereum blockchain.

## Features

### Asset Registration

Users can seamlessly register their assets, providing essential details such as location, ownership, and asset-specific information. The registration process ensures transparency and immutability by leveraging Ethereum smart contracts.

### Marketplace Integration

The DApp includes a decentralized marketplace where users can buy, sell, or trade registered assets. Smart contracts facilitate secure and trustless transactions, ensuring the integrity of asset ownership transfers.

### Auctions and Renting

To enhance flexibility, the project introduces features for asset auctions and renting. Users can participate in auctions to bid on assets, and there's an option to rent assets for a specific duration. These functionalities are governed by smart contracts, promoting trust and security.

### User Authentication and Profiles

A robust authentication system secures user accounts, allowing them to access personalized profiles. Users can track their registered assets, transaction history, and participate in community discussions.

### Responsive UI with Bootstrap

The frontend boasts a responsive design, ensuring a seamless user experience across various devices. Bootstrap is employed for its clean, mobile-friendly components and grid system.

## Future Enhancements

- **User Notifications:** Implement a notification system to alert users about successful registrations, auction bids, and other relevant activities.

- **Enhanced Marketplace Features:** Introduce advanced marketplace features such as a reputation system, detailed asset listings, and a decentralized review system.

- **Integration with External APIs:** Connect the DApp to external APIs for real-time asset data, enhancing the accuracy of registered information.

- **Multi-chain Support:** Explore the possibility of extending the DApp to support multiple blockchains, providing users with more choices and interoperability.

## Tech Stack

- **Smart Contracts:** Ethereum smart contracts written in Solidity.
- **Blockchain Development Framework:** Truffle Suite for smart contract development, testing, and deployment.
- **Frontend Framework:** React.js for building the user interface.
- **Web3 Library:** Ethers.js for Ethereum interactions in the frontend.
- **Styling:** Bootstrap for responsive and clean UI.
- **Infrastructural Services:** Infura for Ethereum node services.

## Project Structure

```

project-root/
│
├── contracts/           # Solidity smart contracts
│   ├── LandAuction.sol
│   ├── LandMarketplace.sol
│   ├── ... (other contracts)
│
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components (Navbar, Footer, etc.)
│   │   ├── forms/        # Forms for asset registration
│   │   ├── auction/      # Auction-related components
│   │   ├── marketplace/  # Marketplace-related components
│   │   ├── renting/      # Renting-related components
│   │   ├── auth/         # Authentication-related components
│   │   ├── profile/      # User profile components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── home/         # Home-related components
│   │   ├── App.js        # Main React application entry point
│   │   ├── index.js      # React application index file
│   │   └── ... (other files)
│
├── migrations/          # Truffle migration scripts
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
│
├── test/                # Test scripts for smart contracts
├── truffle-config.js    # Truffle configuration file
├── .env                 # Environment variables (Infura API key, etc.)
└── README.md            # Project documentation

```

## Prerequisites

1. Node.js: [Install Node.js](https://nodejs.org/)

2. Truffle Suite: [Install Truffle](https://www.trufflesuite.com/truffle)

3. Ganache: [Install Ganache](https://www.trufflesuite.com/ganache)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/devayanm/AssetHub.git
cd AssetHub
```

2. Install dependencies:

```bash
# Install Truffle globally
npm install -g truffle

# Install project dependencies
cd client
npm install
```

3. Configure Environment Variables:

   - Create a `.env` file in the `client` directory.
   - Add your Infura API key:

   ```env
   REACT_APP_INFURA_API_KEY=your_infura_api_key
   ```

4. Compile and migrate smart contracts:

```bash
truffle compile
truffle migrate --reset
```

5. Start the React app:

```bash
cd client
npm start
```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the DApp.

## Testing

Run the Truffle tests:

```bash
truffle test
```

## Contributing

If you would like to contribute to this project, please open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).