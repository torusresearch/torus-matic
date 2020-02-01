const Cinema = artifacts.require("Cinema");

module.exports = function(deployer) {
  deployer.deploy(Cinema);
};
