const VehicleMarketplace = artifacts.require("VehicleMarketplace");

module.exports = function (deployer) {
    deployer.deploy(VehicleMarketplace);
};
