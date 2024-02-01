const VehicleRegistration = artifacts.require("VehicleRegistration");

module.exports = function (deployer) {
    deployer.deploy(VehicleRegistration);
};
