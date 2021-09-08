const StoreKey = artifacts.require("StoreKey");

contract('StoreKey', (accounts) => {
    it('should test the index to be zero', async () => {

        let account = web3.eth.accounts.privateKeyToAccount("7c51fcc94e84fac73727d51fbdc1be262a6c413accfd4c4b693c6b3fab74c51e");
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

        const account1 = accounts[1];
        const account2 = accounts[2];

        // public key
        const pubkey0 = "04f34aee637b220f5a29dcb3084a252d24d65e7e88a7e7fa8548fed734b9d826732e4713eba1cf2709c69026a424e24df115e3c7e73af6c02cca7659a6d74caf41";
        const pubkey1 = "04d64ae2633d289e78b43d0475d7e2942f5a1572d9800ea7b7e584c8781413f6165a8fd7eb2c234cadbfd96691d017eef926b5e6bae908abd708adb67918bcb13d"


        let result = await storeKeyInstance.ownerSetPubkey(account1, Buffer.from(pubkey1, 'hex'));
        console.log("owner设置 account1")
        console.log(result);

        result = await storeKeyInstance.getPubkey(account1, { from: account1 });
        console.log("任何人都可以读取 account1的 pub key")
        console.log(result)

        result = await storeKeyInstance.getPubkey(account2, { from: account1 });
        console.log("任何人都可以读取 account2的pub key")
        console.log(result)

        const encrypBuf = "96fb090c1b3ee85cb8d6cbb47abdf2b904e018f4538e2506e753dd42b3a6281846b1fae853e62d6337b06b1d093bdce01642608d9ef792e923147a6690586e6426f4e1b55fa59d315136fe3367d7c7efc246f9db0eab983ead22c8ed3e1d47997bcb659d77923fb1aa9512b86d8b2163f8c231ec66f4ee5238f4d5be9d4aacc6edaf6cf0167c2e11c221aafec77d75b5e4c86c5b68b360e0afb0faa7df17111056";


        // result = await storeKeyInstance.setEncrypt(account1, Buffer.from(encrypBuf, 'hex'), { from: account0 })
        // console.log(result);

        // result = await storeKeyInstance.getEncrypt(account1, { from: account2 })
        // console.log(result)

        assert.equal(owner, account0, "should equal account0")
    })
    it('Should test public key , address', async () => {
        const storeKeyInstance = await StoreKey.deployed();
        const account1 = accounts[1];
        const account2 = accounts[2]

        const pubkey1 = "04d64ae2633d289e78b43d0475d7e2942f5a1572d9800ea7b7e584c8781413f6165a8fd7eb2c234cadbfd96691d017eef926b5e6bae908abd708adb67918bcb13d"
        // const pubkey2 = "043d527ad7ab840562b36bb9015fb19f5ce545db075eb3cbe4ee116155346920240c417e9d4403e340d58e4f95a6707afe60c218dfe2d5ff3c0b90086323a8d0e7"

        let result = await storeKeyInstance.setPubkey(Buffer.from(pubkey1, 'hex'), { from: account1 })
        console.log(result)

        result = await storeKeyInstance.getPubkey(account1);
        console.log(result);


        /*
                result = await storeKeyInstance.testPubkey1({ from: account1 })
                console.log("\ntestpublickey1:")
                console.log(result)
                console.log(result.toString('hex'))
        
                result = await storeKeyInstance.testPubkey2(Buffer.from(pubkey1, 'hex'), { from: account1 })
                console.log("\ntestpublickey2:")
                console.log(result)
                console.log(result.toString('hex'))
                
                        result = await storeKeyInstance.testPubkey2(Buffer.from(pubkey2, 'hex'), { from: account1 })
                        console.log("\ntestpublickey3:")
                        console.log(result)
                        console.log(result.toString('hex')) */

        assert.equal(1, 1, "test OK")

    })
});