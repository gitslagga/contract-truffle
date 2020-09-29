const DeFi = artifacts.require("DeFi");

contract("DeFi test", async accounts => {
    it("should get token info", async () => {
        let instance = await DeFi.new();
        let name = await instance.name();
        let symbol = await instance.symbol();
        let decimals = await instance.decimals();

        assert.equal(name, "Token");
        assert.equal(symbol, "TK");
        assert.equal(decimals, 18);
    });

    it("should pledge and redeem correctly", async () => {
        let instance = await DeFi.new();
        let amount = await web3.utils.toWei('1');

        await instance.pledge.sendTransaction({from:accounts[1], value:amount});
        let ethBalance = await web3.eth.getBalance(instance.address);
        let tokenBalance = await instance.balanceOf(accounts[1]);

        assert.equal(ethBalance, amount);
        assert.equal(tokenBalance.valueOf(), amount);

        await instance.redeem.sendTransaction(amount, {from:accounts[1]});
        ethBalance = await web3.eth.getBalance(instance.address);
        tokenBalance = await instance.balanceOf(accounts[1]);

        assert.equal(ethBalance, 0);
        assert.equal(tokenBalance.valueOf(), 0);
    });
});