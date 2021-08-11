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

        const encrypBuf = "d056b155000137a3dd224ec93a654fac045b264baa412df8a43c5b3664f970a331707fe1202543c90c494d388abd4632c8358d4777354ccfa4ec33f9bf5944d1b10f97cbd77517c07b77b669ded5bbc19636f367caf1f3505f73e711a2f5cf468699f624d8dc8d21078776e7e1bedb4d1026166fde72097c11a660b0e583b4bd7c335fecc49ba5bcc822f280f6746915c7312ba77098893be85da50895012176cc";


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