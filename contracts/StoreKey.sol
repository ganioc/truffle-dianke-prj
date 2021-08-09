pragma solidity >=0.4.24 <0.6.11;

contract StoreKey {
    uint256 private index;
    address private owner;

    mapping(address => bytes) public pubkeys;
    mapping(address => bytes) public encrypts;

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

    function ownerSetPubkey(address addr, string memory pubkey)
        public
        returns (uint256)
    {
        require(msg.sender == owner);
        pubkeys[addr] = bytes(pubkey);
        return 0;
    }

    function getPubkey(address addr) public view returns (bytes memory) {
        return pubkeys[addr];
    }

    // // only owner of TX can set its own public key
    // function setPubkey(string memory pubkey) public returns (uint256) {
    //     require(bytes(pubkey).length == 130);
    //     // How to check pubkey valid?
    //     require(address(keccak256(bytes(pubkey))) == msg.sender);

    //     if (pubkeys[msg.sender] == bytes(0)) {
    //         index++;
    //     }
    //     pubkeys[msg.sender] = bytes(pubkey);

    //     return 0;
    // }
}
