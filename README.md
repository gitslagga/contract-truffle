# contract-truffle
the solidity contract using truffle


## usage
* npm install -g truffle
* npx truffle init
* npm init
* npm i --save @uniswap/v2-core
* npm i --save @uniswap/v2-periphery
* truffle compile --all
* truffle migrate --reset

## truffle console
* let instance = await LiquidityValueCalculator.deployed()
* let accounts = await web3.eth.getAccounts()
* let balance = aweb3.utils.toWei("1", "ether")
* let newInstance = await LiquidityValueCalculator.new()
* .exit