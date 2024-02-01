const VehicleAuction = artifacts.require("VehicleAuction");

module.exports = function (deployer) {
    deployer.deploy(VehicleAuction);
};
