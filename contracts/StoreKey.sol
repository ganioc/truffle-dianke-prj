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

    function ownerSetPubkey(address addr, bytes memory pubkey)
        public
        returns (uint256)
    {
        require(msg.sender == owner);
        require(pubkey.length == 65);
        if (pubkeys[addr].length == 0) {
            index++;
        }
        pubkeys[addr] = bytes(pubkey);
        return 0;
    }

    // only owner of TX can set its own public key
    function setPubkey(bytes memory pubkey) public returns (uint256) {
        require(pubkey.length == 65);
        // How to check pubkey valid?
        require(msg.sender == pubkey2Address(pubkey));

        if (pubkeys[msg.sender].length == 0) {
            index++;
        }
        pubkeys[msg.sender] = bytes(pubkey);

        return 0;
    }

    function pubkey2Address(bytes memory pubkey)
        internal
        pure
        returns (address)
    {
        require(pubkey.length == 65);
        bytes memory buf = new bytes(64);

        for (uint256 i = 0; i < 64; i++) {
            buf[i] = pubkey[i + 1];
        }

        return address(uint160(uint256(keccak256(buf))));
    }

    function getPubkey(address addr) public view returns (bytes memory) {
        return pubkeys[addr];
    }

    function setEncrypt(address addr, bytes memory encrypt)
        public
        returns (uint256)
    {
        require(msg.sender == owner);
        require(encrypt.length == 161);
        encrypts[addr] = bytes(encrypt);
        return 0;
    }

    function getEncrypt(address addr) public view returns (bytes memory) {
        return encrypts[addr];
    }
}
