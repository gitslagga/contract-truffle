const Test = artifacts.require("Test");
const TestPayable = artifacts.require("TestPayable");
const Caller = artifacts.require("Caller")

module.exports = function(deployer) {
    deployer.deploy(Test);
    deployer.deploy(TestPayable);
    deployer.deploy(Caller)
};
