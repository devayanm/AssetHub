// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentContract {
    mapping(address => uint256) public rentBalances;

    function payRent() external payable {
        require(msg.value > 0, "Invalid rent amount");
        rentBalances[msg.sender] += msg.value;
    }

    function withdrawRent() external {
        require(rentBalances[msg.sender] > 0, "No rent balance");
        payable(msg.sender).transfer(rentBalances[msg.sender]);
        rentBalances[msg.sender] = 0;
    }
}
