// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRenting {
    mapping(uint256 => address) public landOwners;
    mapping(uint256 => bool) public landIsRented;
    mapping(uint256 => address) public landRenters;

    function rentLand(uint256 landId) external payable {
        require(landOwners[landId] != address(0), "Land not registered");
        require(!landIsRented[landId], "Land already rented");
        require(msg.value > 0, "Invalid rent amount");
        landOwners[landId] = msg.sender;
        landIsRented[landId] = true;
        landRenters[landId] = msg.sender;
    }

    function endLandRent(uint256 landId) external {
        require(landOwners[landId] == msg.sender, "You are not the owner");
        require(landIsRented[landId], "Land is not rented");
        landOwners[landId] = address(0);
        landIsRented[landId] = false;
        payable(landRenters[landId]).transfer(address(this).balance);
    }
}
