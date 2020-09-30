const MyContract = artifacts.require("MyContract");
const GLDToken = artifacts.require("GLDToken");
const BigNumber = require('big-number');

contract('MyContract', (accounts) => {
    let myContract;
    let gldToken;
    let contractAddress;
    const amount = BigNumber(10).pow(18).multiply(1).toString(10);

    before(async () => {
        gldToken = await GLDToken.new(web3.utils.toWei("1000"));
        myContract = await MyContract.new(gldToken.address);
        contractAddress = myContract.address;
    });

    it('creates deposit.', async () => {
        await myContract.deposit({from:accounts[0], value:amount});

        let _balances = await myContract._balances(accounts[0]);
        assert.equal(_balances.valueOf(), amount);

        let balance = await web3.eth.getBalance(contractAddress);
        assert.equal(balance.valueOf(), amount);
    });

    it('creates withdraw.', async () => {
        await myContract.withdraw(amount);

        let balance = await gldToken.balanceOf(contractAddress);
        assert.equal(balance.valueOf(), 0);
    });

    it('creates deposit usdt.', async () => {
        await gldToken.approve(contractAddress, amount);

        let allowance = await gldToken.allowance(accounts[0], contractAddress)
        assert.equal(allowance.valueOf(), amount);

        await myContract.depositToken(amount);

        allowance = await gldToken.allowance(accounts[0], contractAddress)
        assert.equal(allowance.valueOf(), 0);

        let balance = await gldToken.balanceOf(contractAddress);
        assert.equal(balance.valueOf(), amount);
    });

    it('creates withdraw usdt.', async () => {
        await myContract.withdrawToken(amount);

        let balance = await gldToken.balanceOf(contractAddress);
        assert.equal(balance.valueOf(), 0);
    });

});