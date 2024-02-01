// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandPaymentTracking {
    mapping(uint256 => uint256) public landTransactionAmounts;
    mapping(uint256 => bool) public landTransactionsCompleted;

    function initiateLandTransaction(uint256 landId, uint256 amount) external {
        require(!landTransactionsCompleted[landId], "Transaction already completed");
        landTransactionAmounts[landId] = amount;
    }

    function completeLandTransaction(uint256 landId) external {
        require(!landTransactionsCompleted[landId], "Transaction already completed");
        payable(msg.sender).transfer(landTransactionAmounts[landId]);
        landTransactionsCompleted[landId] = true;
    }
}
