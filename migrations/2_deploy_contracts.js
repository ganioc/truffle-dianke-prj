const StoreKey = artifacts.require("StoreKey");
const BasicToken = artifacts.require("BasicToken");
module.exports = function (deployer) {
  deployer.deploy(StoreKey);
  deployer.deploy(BasicToken, 10000);
};
