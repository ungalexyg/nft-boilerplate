// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * ERC-721 boilerplate
 */
contract GameItem721 is ERC721URIStorage {
    // Counters utils
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // default price
    uint256 public _itemPrice = 0.1 ether;
    address public _owner;

    /**
     * setup the token
     */
    constructor() ERC721("GameItem", "ITM") {
        _owner = msg.sender;
    }

    /**
     * award an item to player
     * tokenURI should point to api with json stracture as in
     * /public/nft-meta.json
     */
    function awardItem(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment(); // util from openzeplin

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    /**
     * sample purchase implementation
     */
    function purchase() public payable returns (bool) {
        require(
            msg.value >= _itemPrice,
            "cannot progress with lower amount than the item price"
        );

        _tokenIds.increment(); // util from openzeplin

        uint256 newItemId = _tokenIds.current();

        payable(_owner).transfer(msg.value);

        _mint(msg.sender, newItemId);

        return true;
    }
}
