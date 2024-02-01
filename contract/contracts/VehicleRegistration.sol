// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleRegistration {
    mapping(uint256 => address) public vehicleOwners;

    function registerVehicle(uint256 vehicleId) external {
        require(vehicleOwners[vehicleId] == address(0), "Vehicle already registered");
        vehicleOwners[vehicleId] = msg.sender;
    }
}
