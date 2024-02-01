const LandMarketplace = artifacts.require("LandMarketplace");

module.exports = function (deployer) {
    deployer.deploy(LandMarketplace);
};
