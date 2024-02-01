const LandRegistration = artifacts.require("LandRegistration");

module.exports = function (deployer) {
    deployer.deploy(LandRegistration);
};
