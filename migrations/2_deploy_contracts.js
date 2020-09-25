const GLDToken = artifacts.require("GLDToken");
const GameItem = artifacts.require("GameItem");
const Casino = artifacts.require("Casino")

module.exports = function(deployer) {
    deployer.deploy(GLDToken, 1000);
    deployer.deploy(GameItem, "GameItem", "ITM");
    deployer.deploy(Casino)
};
