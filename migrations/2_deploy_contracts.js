const GLDToken = artifacts.require("GLDToken");
const GameItem = artifacts.require("GameItem");
const Casino = artifacts.require("Casino")
const Test = artifacts.require("Test");
const TestPayable = artifacts.require("TestPayable");
const Caller = artifacts.require("Caller")
const DeFi = artifacts.require("DeFi");

module.exports = function(deployer) {
    deployer.deploy(GLDToken, 1000);
    deployer.deploy(GameItem, "GameItem", "ITM");
    deployer.deploy(Casino)
    
    deployer.deploy(Test);
    deployer.deploy(TestPayable);
    deployer.deploy(Caller)
    
    deployer.deploy(DeFi);
};
