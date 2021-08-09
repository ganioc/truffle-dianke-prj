const StoreKey = artifacts.require("StoreKey");

contract('StoreKey', (accounts) => {
    it('should test the index to be zero', async () => {

        let account = web3.eth.accounts.privateKeyToAccount("73be53ae72b11b71beb398da1d9d4dd3cdadbd9b22dc6b98377917b9bbb8bfa8");
        console.log(account)

        const storeKeyInstance = await StoreKey.deployed();

        const index = await storeKeyInstance.getIndex();
        console.log(index.valueOf())
        console.log(index.toNumber())

        assert.equal(index, 0, 'index is 0 in the initial state')
    })
    it('Should test owner', async () => {
        const storeKeyInstance = await StoreKey.deployed();

        const owner = await storeKeyInstance.getOwner();
        console.log('owner:', owner);
        const account0 = accounts[0];
        console.log('accounts[0]:', account0);
        console.log('accounts[1]', accounts[1]);
        console.log('accounts[2]', accounts[2])

        const account1 = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
        const account2 = accounts[2];
        let result = await storeKeyInstance.ownerSetPubkey(account1, "aaaa");
        console.log("owner设置")
        console.log(result);

        result = await storeKeyInstance.getPubkey(account1);
        console.log("任何人都可以读取")
        console.log(result)

        result = await storeKeyInstance.getPubkey(account2);
        console.log("任何人都可以读取 account2")
        console.log(result)

        assert.equal(owner, account0, "should equal account0")
    })
});