import React from 'react';
import useContractConfiguration from './contracts';
import useContractInteractions from './contractInteractions';

function App() {
  const { web3, accounts, connect, contractAddresses, contractABIs, contracts } = useContractConfiguration();
  const { handleLandRegistration, handleVehicleRegistration } = useContractInteractions(contracts, accounts);

  return (
    <div className="App">
      <h1>Asset Hub Frontend</h1>
      {accounts.length > 0 ? (
        <p>Connected Account: {accounts[0]}</p>
      ) : (
        <button onClick={connect}>Connect to Web3</button>
      )}
      {contracts.landRegistration && (
        <button onClick={handleLandRegistration}>Register Land</button>
      )}
      {contracts.vehicleRegistration && (
        <button onClick={handleVehicleRegistration}>Register Vehicle</button>
      )}
    </div>
  );
}

export default App;
