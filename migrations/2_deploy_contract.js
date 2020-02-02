const Cinema = artifacts.require("Cinema");

module.exports = function(deployer, network, accounts) {
  console.log(accounts);
  deployer.deploy(Cinema, accounts[0]);
};
