// import contracts to test from truffle's artifacts
const CoffeeToken = artifacts.require("CoffeeToken"); // here .sol not required

// procedure to use chai's big number lib, inject web3's BN into chai-bn
// @see: https://www.chaijs.com/plugins/chai-bn/
const BN = web3.utils.BN; // web3 is auto injected to the tests
const chai = require("chai");
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

// procedure to use chai-as-promised
// @see: https://www.chaijs.com/plugins/chai-as-promised/ 
const chaiAsPromised = require("chai-as-promised");
const { isTopic } = require("web3-utils");
const { assert } = require("console");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("CoffeeToken Test", async (accounts) => {

    // destruct accounts
    const [
        deployerAccount,  // accounts[0]
        the2ndAccount, // accounts[1]
        the3rdAccount, // accounts[2]
        the4thAccount // accounts[3]
    ] = accounts;


    it("totalSupply exist", async () => {
        let contract = await CoffeeToken.deployed();
        let totalSupply = await contract.totalSupply();
        expect(totalSupply, "totalSupply should exist").to.exist;
    });

    it("all tokens should be in deployer account", async () => {
        let contract = await CoffeeToken.deployed();
        let totalSupply = await contract.totalSupply();

        // # -------------------------------------------
        // # approach - 1 basic
        // let balance = await contract.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), initialSupply.valueOf(), "not equal balance");
        // # -------------------------------------------

        // # -------------------------------------------
        // # approach - 2 with chai-as-promised
        // (2 + 2).should.equal(4);
        // becomes
        // Promise.resolve(2 + 2).should.eventually.equal(4);
        // # -------------------------------------------

        expect(contract.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("possible to send tokens between accounts", async () => {
        let contract = await CoffeeToken.deployed();
        let totalSupply = await contract.totalSupply();
        let sendTokens = 1;
        let sendTokensBigNumber = new BN(sendTokens);

        //check that total supply landed in deployer account
        expect(contract.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);

        //check that predefined tokens are sent to given account 
        // to.eventually.be.fulfilled = this promise should be fulfilled with try-catch, etc...
        expect(contract.transfer(the2ndAccount, sendTokens)).to.eventually.be.fulfilled;

        // check affected balances
        expect(contract.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(sendTokensBigNumber));
        expect(contract.balanceOf(the2ndAccount)).to.eventually.be.a.bignumber.equal(sendTokensBigNumber);
    });

    it("not possible to send more tokens than total supply", async () => {
        // let contract = await CoffeeToken.deployed();
        // let totalSupply = await contract.totalSupply();
        // // let balanceOfDeployer = await contract.balanceOf(deployerAccount);

        // expect(contract.transfer(the2ndAccount, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;
        // expect(contract.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);

    });

});

