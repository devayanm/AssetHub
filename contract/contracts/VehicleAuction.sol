// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleAuction {
    mapping(uint256 => address) public vehicleOwners;
    mapping(uint256 => uint256) public vehicleAuctionEndTimes;
    mapping(uint256 => uint256) public vehicleHighestBids;
    mapping(uint256 => address) public vehicleHighestBidders;

    function startVehicleAuction(uint256 vehicleId, uint256 duration) external {
        require(vehicleOwners[vehicleId] == msg.sender, "You are not the owner");
        require(vehicleAuctionEndTimes[vehicleId] == 0, "Auction already started");
        vehicleAuctionEndTimes[vehicleId] = block.timestamp + duration;
    }

    function placeVehicleBid(uint256 vehicleId) external payable {
        require(vehicleAuctionEndTimes[vehicleId] > 0, "Auction not started");
        require(block.timestamp < vehicleAuctionEndTimes[vehicleId], "Auction ended");
        require(msg.value > vehicleHighestBids[vehicleId], "Bid too low");
        if (vehicleHighestBids[vehicleId] > 0) {
            payable(vehicleHighestBidders[vehicleId]).transfer(vehicleHighestBids[vehicleId]);
        }
        vehicleHighestBids[vehicleId] = msg.value;
        vehicleHighestBidders[vehicleId] = msg.sender;
    }

    function endVehicleAuction(uint256 vehicleId) external {
        require(vehicleOwners[vehicleId] == msg.sender, "You are not the owner");
        require(vehicleAuctionEndTimes[vehicleId] > 0, "Auction not started");
        require(block.timestamp >= vehicleAuctionEndTimes[vehicleId], "Auction still ongoing");
        payable(vehicleOwners[vehicleId]).transfer(vehicleHighestBids[vehicleId]);
        vehicleOwners[vehicleId] = vehicleHighestBidders[vehicleId];
        vehicleAuctionEndTimes[vehicleId] = 0;
        vehicleHighestBids[vehicleId] = 0;
        vehicleHighestBidders[vehicleId] = address(0);
    }
}
