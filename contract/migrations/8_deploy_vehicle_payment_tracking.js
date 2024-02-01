const VehiclePaymentTracking = artifacts.require("VehiclePaymentTracking");

module.exports = function (deployer) {
    deployer.deploy(VehiclePaymentTracking);
};
