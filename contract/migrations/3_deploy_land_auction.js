const LandAuction = artifacts.require("LandAuction");

module.exports = function (deployer) {
    deployer.deploy(LandAuction);
};
