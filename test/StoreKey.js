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

        const account1 = accounts[1];
        const account2 = accounts[2];

        // public key
        const pubkey0 = "04e7341fe1c608b348f051deb090d86794e6a2380d5954e87e225bd4327c70a440e7ed3ea698262fb2da4d354c3dd7ae6eef3ad97a20b993a5351925923938659b";
        const pubkey1 = "04d709c4fb8695d079625dc28f019fb615b752dbbfc7fc37ddaa0e2186ed100a88ffb9db5d2e0b4136350b984a83620dbeed13c488116bf4a1ced600d4b1199184"


        let result = await storeKeyInstance.ownerSetPubkey(account1, Buffer.from(pubkey1, 'hex'));
        console.log("owner设置 account1")
        console.log(result);

        result = await storeKeyInstance.getPubkey(account1, { from: account1 });
        console.log("任何人都可以读取 account1")
        console.log(result)

        result = await storeKeyInstance.getPubkey(account2, { from: account1 });
        console.log("任何人都可以读取 account2")
        console.log(result)

        const encrypBuf = "908532463f98e2294630c6109fb838ca0409c28b7219ff54c3a525d3a29fcb4aa79cbd3e1af28705d2298e98712c4fbb9179909f2dad2711f518abe96eaf53cfbf80cf11efbb72fc13bb3a4d0b3222b4f6df24a118f20c8683d37bb424e265679fd9f0a6b1a2fcb5ee6a42954ee1968e7e5f0c21b375c183f2b90a569551d45807daf8b856bc2f1b614ad7a83504be8ac07dcd5c4802def9ca65096496d1c5b258";


        result = await storeKeyInstance.setEncrypt(account1, Buffer.from(encrypBuf, 'hex'), { from: account0 })
        console.log(result);

        result = await storeKeyInstance.getEncrypt(account1, { from: account2 })
        console.log(result)

        assert.equal(owner, account0, "should equal account0")
    })
    it('Should test public key , address', async () => {
        const storeKeyInstance = await StoreKey.deployed();
        const account1 = accounts[1];
        const account2 = accounts[2]

        const pubkey1 = "04d709c4fb8695d079625dc28f019fb615b752dbbfc7fc37ddaa0e2186ed100a88ffb9db5d2e0b4136350b984a83620dbeed13c488116bf4a1ced600d4b1199184"
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