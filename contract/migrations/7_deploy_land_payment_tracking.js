const LandPaymentTracking = artifacts.require("LandPaymentTracking");

module.exports = function (deployer) {
    deployer.deploy(LandPaymentTracking);
};
