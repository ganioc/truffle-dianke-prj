const BasicToken = artifacts.require("BasicToken");

contract('BasicToken', (accounts) => {
    it('should test BasicToken 10000', async () => {
        const basicTokenInstance = await BasicToken.deployed();
        const initialAmount = await basicTokenInstance.balanceOf(accounts[0].toString());

        console.log("accounts[0]:", initialAmount);

        assert.equal(initialAmount, 10000, 'should have 10000')

    })
})