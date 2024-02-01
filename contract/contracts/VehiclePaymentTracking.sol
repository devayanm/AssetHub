// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehiclePaymentTracking {
    mapping(uint256 => uint256) public vehicleTransactionAmounts;
    mapping(uint256 => bool) public vehicleTransactionsCompleted;

    function initiateVehicleTransaction(uint256 vehicleId, uint256 amount) external {
        require(!vehicleTransactionsCompleted[vehicleId], "Transaction already completed");
        vehicleTransactionAmounts[vehicleId] = amount;
    }

    function completeVehicleTransaction(uint256 vehicleId) external {
        require(!vehicleTransactionsCompleted[vehicleId], "Transaction already completed");
        payable(msg.sender).transfer(vehicleTransactionAmounts[vehicleId]);
        vehicleTransactionsCompleted[vehicleId] = true;
    }
}
