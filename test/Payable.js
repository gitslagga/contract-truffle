const Test = artifacts.require("Test");
const TestPayable = artifacts.require("TestPayable");
const Caller = artifacts.require("Caller")

contract("Payable test", async accounts => {
    it("should get 1 test", async () => {
        let test = await Test.new()
        let caller = await Caller.new()
        await caller.callTest(test.address, {from:accounts[1], value:1000000000000000000})

        let x = await test.x()
        assert.equal(x.valueOf(), 1)
    });

    it("should get 2 TestPayable", async () => {
        let testPayable = await TestPayable.new()
        let caller = await Caller.new()

        await testPayable.sendTransaction({from:accounts[1], value:2000000000000000000})
        let x = await testPayable.x()
        let y = await testPayable.y()
        
        assert.equal(x.valueOf(), 2)
        assert.equal(y.valueOf(), 2000000000000000000)

        
        await caller.callTestPayable(testPayable.address, {from:accounts[1], value:1000000000000000000})

        x = await testPayable.x()
        y = await testPayable.y()
        // console.log("x value:", x.toNumber())
        // console.log("y value:", y.toNumber())
        
        assert.equal(x.valueOf(), 1)
        assert.equal(y.valueOf(), 1)
    });
});