const VehicleRenting = artifacts.require("VehicleRenting");

module.exports = function (deployer) {
    deployer.deploy(VehicleRenting);
};
