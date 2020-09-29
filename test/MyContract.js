const MyContract = artifacts.require("MyContract");
const GLDToken = artifacts.require("GLDToken");
const BigNumber = require('big-number');

contract('MyContract', (accounts) => {
    let myContract;
    let gldToken;
    const amount = BigNumber(10).pow(18).multiply(100).toString(10);

    before(async () => {
        gldToken = await GLDToken.new(web3.utils.toWei("1000"));
        myContract = await MyContract.new(gldToken.address);
    });

    // it('creates withdraw usdt.', async () => {
    //     // let balance1 = await gldToken.balanceOf(accounts[0]);
    //     // console.log("myContract balance", balance1.toString());
    //     // console.log("myContract balance", amount);

    //     let result = await myContract.withdraw(accounts[0], accounts[1], amount);
    //     console.log("myContract withdraw", result);

    //     let balance = await gldToken.balanceOf(accounts[1]);
    //     assert.equal(balance.valueOf(), amount);
    // });

    // it('creates deposit usdt.', async () => {
    //     await myContract.deposit(accounts[0], amount);

    //     let balance = await gldToken.balanceOf(accounts[1]);
    //     assert.equal(balance.valueOf(), 0);
    // });

});