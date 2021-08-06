pragma solidity >=0.4.24 <0.6.11;

contract StoreKey {
    uint256 private index;
    address private owner;

    constructor() public {
        owner = msg.sender;
        index = 0;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getIndex() public view returns (uint256) {
        return index;
    }
}
