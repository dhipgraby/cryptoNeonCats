const Token = artifacts.require("Catscontract");
const Marketplace = artifacts.require("NeonCatMarketplace");

module.exports = function (deployer) {
  deployer.deploy(Marketplace, Token.address);
};

