const path = require("path");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_directory: "contracts",
    contracts_build_directory: path.join(__dirname, "src/contracts"),
    networks: {
        develop: {
            host: "127.0.0.1",
            // port: 8545, //default
            port: 7545, //ganache
            network_id: "*" // Match any network id
        }
    },
    compilers: {
        solc: {
            version: "^0.8.0"
        }
    }
};