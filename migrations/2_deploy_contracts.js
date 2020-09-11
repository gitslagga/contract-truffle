const LiquidityValueCalculator = artifacts.require("LiquidityValueCalculator");

module.exports = function(deployer) {
  deployer.deploy(LiquidityValueCalculator, "0xB0038e7b012fD2788450F8acF275B66Edf6aCA8c");
};
