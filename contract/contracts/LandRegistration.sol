// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistration {
    mapping(uint256 => address) public landOwners;

    function registerLand(uint256 landId) external {
        require(landOwners[landId] == address(0), "Land already registered");
        landOwners[landId] = msg.sender;
    }
}
