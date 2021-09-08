pragma solidity >=0.4.24 <0.6.11;

contract StoreKey {
    uint256 private index;
    address private owner;

    struct Request {
        bytes hashId;
        bytes newHashId;
        bytes encryptedSecret;
        uint256 status;
        bool exists;
    }
    enum ErrorCode {
        OK,
        Exist,
        Fail,
        //3
        Unknown
    }
    struct PubkeyItem {
        bytes pubkey;
        bool exists;
    }

    event EventSetRequest(address addr, address id, bytes hashId);

    // address[] private whitelist;
    mapping(address => bool) public whitelist;
    mapping(address => PubkeyItem) public pubkeys;
    mapping(address => bool) public admins;
    // the 2nd address is keccak256() of hashId
    // mapping(address =>  address) public ids;
    // mapping(address => Request[]) public requests;
    mapping(address => mapping(address => Request)) public requests;

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
        require(whitelist[addr] == true, "Not in whitelist.");
        // if (pubkeys[addr].length == 0) {
        //     index++;
        // }
        // pubkeys[addr] = bytes(pubkey);
        PubkeyItem memory item = pubkeys[addr];

        if (item.exists != true) {
            index++;
        }
        pubkeys[addr] = PubkeyItem(bytes(pubkey), true);

        return 0;
    }

    // only owner of TX can set its own public key
    function setPubkey(bytes memory pubkey) public returns (uint256) {
        require(pubkey.length == 65);
        // How to check pubkey valid?
        require(msg.sender == pubkey2Address(pubkey));
        require(whitelist[msg.sender] == true, "Not in whitelist.");

        // if (pubkeys[msg.sender].length == 0) {
        //     index++;
        // }
        // pubkeys[msg.sender] = bytes(pubkey);
        PubkeyItem memory item = pubkeys[msg.sender];

        if (item.exists != true) {
            index++;
        }
        pubkeys[msg.sender] = PubkeyItem(bytes(pubkey), true);

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

    function bytes2Address(bytes memory str) internal pure returns (address) {
        return address(uint160(uint256(keccak256(str))));
    }

    function getPubkey(address addr) public view returns (bytes memory) {
        return pubkeys[addr].pubkey;
    }

    function addAdmin(address addr) public returns (uint256) {
        require(msg.sender == owner);
        admins[addr] = true;
        return 0;
    }

    function removeAdmin(address addr) public returns (uint256) {
        require(msg.sender == owner);
        if (admins[addr] != true) {
            return 3;
        }
        delete admins[addr];
        return 0;
    }

    function isAdmin(address addr) public view returns (bool) {
        return admins[addr];
    }

    function addWhiteList(address addr) public returns (uint256) {
        require(msg.sender == owner || admins[addr] == true);
        whitelist[addr] = true;
        return 0;
    }

    function removeWhiteList(address addr) public returns (uint256) {
        require(msg.sender == owner || admins[addr] == true);
        require(whitelist[addr] == true, "Not exist.");
        delete whitelist[addr];
        delete pubkeys[addr];
        return 0;
    }

    function setRequest(bytes memory hashId) public returns (uint256) {
        require(pubkeys[msg.sender].exists == true, "No pubkey set");

        address addrHash = bytes2Address(hashId);

        requests[msg.sender][addrHash] = Request(
            bytes(hashId),
            new bytes(0),
            new bytes(0),
            100,
            true
        );

        emit EventSetRequest(msg.sender, addrHash, hashId);
        return 0;
    }

    function updateRequest(
        bytes memory hashId,
        bytes memory newHashId,
        bytes memory encryptedSecret
    ) public returns (uint256) {
        address addrHash = bytes2Address(hashId);

        require(
            admins[msg.sender] == true || msg.sender == owner,
            "No admin rights"
        );

        require(
            requests[msg.sender][addrHash].exists == true,
            "Request unavailable"
        );

        requests[msg.sender][addrHash].hashId = bytes(hashId);
        requests[msg.sender][addrHash].newHashId = bytes(newHashId);
        requests[msg.sender][addrHash].encryptedSecret = bytes(encryptedSecret);
        requests[msg.sender][addrHash].status = 0;
        return 0;
    }

    function refuseRequest(bytes memory hashId, uint256 status)
        public
        returns (uint256)
    {
        address addrHash = bytes2Address(hashId);

        require(
            admins[msg.sender] == true || msg.sender == owner,
            "No admin rights"
        );

        require(
            requests[msg.sender][addrHash].exists == true,
            "Request unavailable"
        );

        requests[msg.sender][addrHash].status = status;
        return 0;
    }

    function getRequest(bytes memory hashId)
        public
        view
        returns (
            bytes memory,
            bytes memory,
            bytes memory,
            uint256
        )
    {
        address addrHash = bytes2Address(hashId);

        require(
            requests[msg.sender][addrHash].exists == true,
            "Request unavailable"
        );

        return (
            requests[msg.sender][addrHash].hashId,
            requests[msg.sender][addrHash].newHashId,
            requests[msg.sender][addrHash].encryptedSecret,
            requests[msg.sender][addrHash].status
        );
    }

    function queryRequest(address addr, bytes memory hashId)
        public
        view
        returns (
            bytes memory,
            bytes memory,
            bytes memory,
            uint256
        )
    {
        address addrHash = bytes2Address(hashId);

        require(requests[addr][addrHash].exists == true, "Request unavailable");

        return (
            requests[addr][addrHash].hashId,
            requests[addr][addrHash].newHashId,
            requests[addr][addrHash].encryptedSecret,
            requests[addr][addrHash].status
        );
    }
}
