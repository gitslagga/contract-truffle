const Casino = artifacts.require("Casino");

contract("Casino test", async accounts => {
    it("should get 0 Casino in the first account", async () => {
        let instance = await Casino.new();
        let maxbet = await instance.getMaxBet();
        assert.equal(maxbet.valueOf(), 0);
    });

    it("should send coin correctly", async () => {
        // Get initial balances of first and second account.
        let account_one = accounts[0];
        let account_two = accounts[1];

        let instance = await Casino.new();

        await instance.fund({from:account_one, value:100});

        let maxbet = await instance.getMaxBet();
        assert.equal(maxbet, 1, "getMaxBet wasn't correctly taken from the sender");

        await instance.bet(6, {from:account_two, value:1});
    });
});