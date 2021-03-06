// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * ERC-20 boilerplate
 */
contract CoffeeToken20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("Coffee Token", "COFF") {
        _mint(msg.sender, initialSupply);
    }
}
