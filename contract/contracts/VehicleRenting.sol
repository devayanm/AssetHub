// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleRenting {
    mapping(uint256 => address) public vehicleOwners;
    mapping(uint256 => bool) public vehicleIsRented;
    mapping(uint256 => address) public vehicleRenters;

    function rentVehicle(uint256 vehicleId) external payable {
        require(vehicleOwners[vehicleId] != address(0), "Vehicle not registered");
        require(!vehicleIsRented[vehicleId], "Vehicle already rented");
        require(msg.value > 0, "Invalid rent amount");
        vehicleOwners[vehicleId] = msg.sender;
        vehicleIsRented[vehicleId] = true;
        vehicleRenters[vehicleId] = msg.sender;
    }

    function endVehicleRent(uint256 vehicleId) external {
        require(vehicleOwners[vehicleId] == msg.sender, "You are not the owner");
        require(vehicleIsRented[vehicleId], "Vehicle is not rented");
        vehicleOwners[vehicleId] = address(0);
        vehicleIsRented[vehicleId] = false;
        payable(vehicleRenters[vehicleId]).transfer(address(this).balance);
    }
}
