// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandMarketplace {
    mapping(uint256 => address) public landOwners;
    mapping(uint256 => uint256) public landPrices;

    function sellLand(uint256 landId, uint256 price) external {
        require(landOwners[landId] == msg.sender, "You are not the owner");
        landPrices[landId] = price;
    }

    function buyLand(uint256 landId) external payable {
        require(landOwners[landId] != address(0), "Land not registered");
        require(msg.value == landPrices[landId], "Incorrect amount");
        address previousOwner = landOwners[landId];
        landOwners[landId] = msg.sender;
        payable(previousOwner).transfer(msg.value);
    }
}
