# contract-truffle
the solidity contract using truffle


## usage
* npm install -g truffle
* npx truffle init
* npm init
* npm install --save @uniswap/v2-core
* npm install --save @uniswap/v2-periphery
* npm install dotenv
* npm install big-number
* truffle compile --all
* truffle migrate --reset
* npm install @truffle/hdwallet-provider
* truffle test
* truffle test ./test/metacoin.js


## truffle verify
* npm install truffle-plugin-verify
* truffle run verify Migrations GLDToken GameItem --network=ropsten --license=MIT


## truffle config
* ganache node config
```
    development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 7545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
    },
```
* ropsten node config
```
    ropsten: {
        provider: function() {
            return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/YOUR-PROJECT-ID");
        },
        network_id: '3',
    },
```


## truffle console
* let instance = await GLDToken.deployed()
* let accounts = await web3.eth.getAccounts()
* let balance = await instance.balanceOf(accounts[0])
* balance   //BN {}
* balance = await web3.utils.fromWei(balance.toString(), "ether")
* balance   //'1000' 
* balance = await web3.utils.toWei(balance, "ether")
* balance   //'1000000000000000000000'
* let newInstance = await GLDToken.new()
* .exit