const Token = artifacts.require("Catscontract");

module.exports = function (deployer) {
  deployer.deploy(Token);
};
