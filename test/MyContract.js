const MyContract = artifacts.require("MyContract");
const GLDToken = artifacts.require("GLDToken");
const BigNumber = require('big-number');

contract('MyContract', (accounts) => {
    let myContract;
    let gldToken;
    let contractAddress;
    const amount = BigNumber(10).pow(18).multiply(100).toString(10);

    before(async () => {
        gldToken = await GLDToken.new(web3.utils.toWei("1000"));
        myContract = await MyContract.new(gldToken.address);
        contractAddress = myContract.address;
    });

    it('creates deposit usdt.', async () => {
        await gldToken.approve(contractAddress, amount);

        let allowance = await gldToken.allowance(accounts[0], contractAddress)
        assert.equal(allowance.valueOf(), amount);

        await myContract.deposit(amount);

        allowance = await gldToken.allowance(accounts[0], contractAddress)
        assert.equal(allowance.valueOf(), 0);

        let balance = await gldToken.balanceOf(contractAddress);
        assert.equal(balance.valueOf(), amount);
    });

    it('creates withdraw usdt.', async () => {
        await myContract.withdraw(amount);

        let balance = await gldToken.balanceOf(contractAddress);
        assert.equal(balance.valueOf(), 0);
    });

});