const RentContract = artifacts.require("RentContract");

module.exports = function (deployer) {
    deployer.deploy(RentContract);
};
