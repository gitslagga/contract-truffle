const SlotMachine = artifacts.require("SlotMachine");
const BigNumber = require('big-number');

contract('SlotMachine', (accounts) => {
    let slotMachine;
    const amount = BigNumber(10).pow(18).multiply(1).toString(10);

    before(async () => {
        slotMachine = await SlotMachine.new();
    });

    it('play withdraw.', async () => {
        let result = await slotMachine.play(["0x6170706c65000000000000000000000000000000000000000000000000000000",
            "0x6f72616e67650000000000000000000000000000000000000000000000000000"], [10, 10], { from: accounts[1], value: amount });
        // console.log("play", result)

        result = await slotMachine.withdraw(amount, { from: accounts[0] });
        // console.log("withdraw", result);
    });

    it('rand convertBytes32ToString convertStringToBytes32.', async () => {
        let result = await slotMachine.rand(8);
        console.log("rand", result.toNumber())

        result = await slotMachine.convertBytes32ToString("0x6170706c65000000000000000000000000000000000000000000000000000000");
        console.log("convertBytes32ToString", result);

        result = await slotMachine.convertStringToBytes32("apple");
        console.log("convertStringToBytes32", result);
    });

});