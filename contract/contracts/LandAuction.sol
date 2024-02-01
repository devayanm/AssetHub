// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandAuction {
    mapping(uint256 => address) public landOwners;
    mapping(uint256 => uint256) public landAuctionEndTimes;
    mapping(uint256 => uint256) public landHighestBids;
    mapping(uint256 => address) public landHighestBidders;

    function startLandAuction(uint256 landId, uint256 duration) external {
        require(landOwners[landId] == msg.sender, "You are not the owner");
        require(landAuctionEndTimes[landId] == 0, "Auction already started");
        landAuctionEndTimes[landId] = block.timestamp + duration;
    }

    function placeLandBid(uint256 landId) external payable {
        require(landAuctionEndTimes[landId] > 0, "Auction not started");
        require(block.timestamp < landAuctionEndTimes[landId], "Auction ended");
        require(msg.value > landHighestBids[landId], "Bid too low");
        if (landHighestBids[landId] > 0) {
            payable(landHighestBidders[landId]).transfer(landHighestBids[landId]);
        }
        landHighestBids[landId] = msg.value;
        landHighestBidders[landId] = msg.sender;
    }

    function endLandAuction(uint256 landId) external {
        require(landOwners[landId] == msg.sender, "You are not the owner");
        require(landAuctionEndTimes[landId] > 0, "Auction not started");
        require(block.timestamp >= landAuctionEndTimes[landId], "Auction still ongoing");
        payable(landOwners[landId]).transfer(landHighestBids[landId]);
        landOwners[landId] = landHighestBidders[landId];
        landAuctionEndTimes[landId] = 0;
        landHighestBids[landId] = 0;
        landHighestBidders[landId] = address(0);
    }
}
