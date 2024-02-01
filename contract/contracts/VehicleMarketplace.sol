// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleMarketplace {
    mapping(uint256 => address) public vehicleOwners;
    mapping(uint256 => uint256) public vehiclePrices;

    function sellVehicle(uint256 vehicleId, uint256 price) external {
        require(vehicleOwners[vehicleId] == msg.sender, "You are not the owner");
        vehiclePrices[vehicleId] = price;
    }

    function buyVehicle(uint256 vehicleId) external payable {
        require(vehicleOwners[vehicleId] != address(0), "Vehicle not registered");
        require(msg.value == vehiclePrices[vehicleId], "Incorrect amount");
        address previousOwner = vehicleOwners[vehicleId];
        vehicleOwners[vehicleId] = msg.sender;
        payable(previousOwner).transfer(msg.value);
    }
}
