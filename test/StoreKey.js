const StoreKey = artifacts.require("StoreKey");

contract('StoreKey', (accounts) => {
    it('should test the index to be zero', async () => {
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
        console.log('accounts:', account0);

        assert.equal(owner, account0, "should equal account0")
    })
});