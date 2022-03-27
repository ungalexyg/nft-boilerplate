const CoffeeToken = artifacts.require("CoffeeToken.sol");

module.exports = async function (deployer) {

    //
    await deployer.deploy(CoffeeToken, 1000000);
}