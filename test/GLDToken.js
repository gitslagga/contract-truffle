const GLDToken = artifacts.require("GLDToken");

contract("GLDToken test", async accounts => {
    it("should put 1000*10**18 GLDToken in the first account", async () => {
        let instance = await GLDToken.deployed();
        let balance = await instance.balanceOf.call(accounts[0]);
        assert.equal(balance.valueOf(), 1000*10**18);
    });

    it("should send coin correctly", async () => {
        // Get initial balances of first and second account.
        let account_one = accounts[0];
        let account_two = accounts[1];

        let amount = 10;
        let instance = await GLDToken.deployed();

        let balance = await instance.balanceOf.call(account_one);
        let account_one_starting_balance = web3.utils.fromWei(balance.toString(), "ether");
        balance = await instance.balanceOf.call(account_two);
        let account_two_starting_balance = web3.utils.fromWei(balance.toString(), "ether");

        await instance.transfer(account_two, web3.utils.toWei(amount.toString(), "ether"), { from: account_one });

        balance = await instance.balanceOf.call(account_one);
        let account_one_ending_balance = web3.utils.fromWei(balance.toString(), "ether");

        balance = await instance.balanceOf.call(account_two);
        let account_two_ending_balance = web3.utils.fromWei(balance.toString(), "ether");

        // console.log("1:", account_two_ending_balance)
        // console.log("2:", new Number(account_two_starting_balance) + amount)

        assert.equal(
            account_one_ending_balance,
            new Number(account_one_starting_balance) - amount,
            "Amount wasn't correctly taken from the sender"
        );
        assert.equal(
            account_two_ending_balance,
            new Number(account_two_starting_balance) + amount,
            "Amount wasn't correctly sent to the receiver"
        );
    });
});