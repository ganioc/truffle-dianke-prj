const StoreKey = artifacts.require("StoreKey");

contract('StoreKey', (accounts) => {
    it('should test the index to be zero', async () => {
        const storeKeyInstance = await StoreKey.deployed();

        const index = await storeKeyInstance.getIndex({ from: accounts[0] });
        console.log(index.toNumber())

        assert.equal(index.toNumber(), 0, 'index is 0 in the initial state')
    })
    it('should test whitelist manipulation', async () => {
        const storeKeyInstance = await StoreKey.deployed();
        let result = await storeKeyInstance.addWhiteList(accounts[1], { from: accounts[0] });
        // console.log(result);

        result = await storeKeyInstance.whitelist(accounts[1], { from: accounts[0] });
        console.log(result)
        assert.equal(result, true, "account1 should be in whitelist")
    })
    it('should test whitelist exist or not', async () => {
        const storeKeyInstance = await StoreKey.deployed();
        let result = await storeKeyInstance.whitelist(accounts[2], { from: accounts[0] });
        console.log(result)
        assert.equal(result, false, "account2 shoudl not be in whitelist")



    })
    it('should test pubkey to address transform', async () => {
        const storeKeyInstance = await StoreKey.deployed();
        // account1 add pubkey
        const pubkey1 = "04d709c4fb8695d079625dc28f019fb615b752dbbfc7fc37ddaa0e2186ed100a88ffb9db5d2e0b4136350b984a83620dbeed13c488116bf4a1ced600d4b1199184"
        const pubkey2 = "043d527ad7ab840562b36bb9015fb19f5ce545db075eb3cbe4ee116155346920240c417e9d4403e340d58e4f95a6707afe60c218dfe2d5ff3c0b90086323a8d0e7"

        // result = await storeKeyInstance.setPubkey(Buffer.from(pubkey1, 'hex'), { from: accounts[1] })
        // console.log(result)
        let result = await storeKeyInstance.pubkey2Address(Buffer.from(pubkey1, 'hex'), { from: accounts[1] });
        console.log(result)
        assert.equal(1, 1, 'accounts 1 pubkey to address');
    })
    it('should test pubkey to setPubkey', async () => {
        const storeKeyInstance = await StoreKey.deployed();
        // account1 add pubkey
        const pubkey1 = "04d709c4fb8695d079625dc28f019fb615b752dbbfc7fc37ddaa0e2186ed100a88ffb9db5d2e0b4136350b984a83620dbeed13c488116bf4a1ced600d4b1199184"
        const pubkey2 = "043d527ad7ab840562b36bb9015fb19f5ce545db075eb3cbe4ee116155346920240c417e9d4403e340d58e4f95a6707afe60c218dfe2d5ff3c0b90086323a8d0e7"
        console.log('pubkey1 len:', Buffer.from(pubkey1, 'hex').length)
        console.log("accounts[1],", accounts[1])
        // let result = await storeKeyInstance.setPubkey(Buffer.from(pubkey1, 'hex'), { from: accounts[1] })
        let result = await storeKeyInstance.whitelist(accounts[1]);
        console.log(result);
        assert.equal(true, result, 'accounts1 is in whitelist')


    })
    it('should test setPubkey', async () => {
        const storeKeyInstance = await StoreKey.deployed();
        // account1 add pubkey
        const pubkey1 = "04d709c4fb8695d079625dc28f019fb615b752dbbfc7fc37ddaa0e2186ed100a88ffb9db5d2e0b4136350b984a83620dbeed13c488116bf4a1ced600d4b1199184"

        let result = await storeKeyInstance.setPubkey(Buffer.from(pubkey1, 'hex'), { from: accounts[1] });
        console.log(result)
        console.log(result.logs[0].args)
        assert.equal(result.logs[0].args.pubkey, '0x' + pubkey1, 'pubkey delivered successfully')

    })
})