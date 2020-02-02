let PrivateKeyProvider = require("truffle-privatekey-provider");
let HDWalletProvider = require("truffle-hdwallet-provider");
let privateKey =
  "EF19D1120AF51EFFE3852DB7044A902687BED9B0F3DEF2354129616F56B37414";
let mnemonic =
  "audit fox load tennis lucky attend bubble circle security traffic large clutch";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*" // Any network (default: none)
    },
    matic: {
      provider: new PrivateKeyProvider(
        privateKey,
        "https://testnet2.matic.network/"
      ),
      network_id: "15001",
      from: "0xdb0B020Ab16129983045C80692fa1D1916133471"
    },
    maticNetwork: {
      provider: new HDWalletProvider(
        mnemonic,
        "https://testnet2.matic.network/"
      ),
      network_id: "15001"
    }
  },

  mocha: {},

  compilers: {
    solc: {
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
