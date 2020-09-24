const expect = require('chai').expect

const GameItem = artifacts.require("GameItem");

contract('Testing ERC721 contract', async function(accounts) {

    const name = "GameItem";
    const symbol = "ITM"

    const account1 = accounts[1]
    const tokenUri1 = "This is data for the token 1"; // Does not have to be unique

    const account2 = accounts[2]
    const tokenUri2 = "This is data for the token 2"; // Does not have to be unique

    const account3 = accounts[3]

    it(' should be able to deploy and mint ERC721 token', async () => {
        const token = await GameItem.deployed()
        const tokenId = await token.awardItem(account1, tokenUri1, {from: accounts[0]})

        expect(await token.symbol()).to.equal(symbol)
        expect(await token.name()).to.equal(name)
        // expect(tokenId).to.be.equal(1)
    })

    it(' should allow creation of multiple unique tokens and manage ownership', async () => {
        const token = await GameItem.deployed();
        await token.awardItem(account2, tokenUri2, {from: accounts[0]})

        expect(Number(await token.totalSupply())).to.equal(2)

        expect(await token.tokenURI(1)).to.equal(tokenUri1)
        expect(await token.tokenURI(2)).to.equal(tokenUri2)
        // expect(await token.tokenURI(9999)).to.be.rejectedWith(`VM Exception while processing transaction: revert ERC721Metadata: URI query for nonexistent token`)

        expect(await token.ownerOf(1)).to.equal(account1)
        expect(await token.ownerOf(2)).to.equal(account2)
    })

    it(' should allow safe transfers', async () => {
        const token = await GameItem.deployed();
        // const unownedTokenId = token.safeTransferFrom(account2, account3, 1, {from: accounts[2]}) // tokenId
        // expect(unownedTokenId).to.be.rejectedWith(/VM Exception while processing transaction: revert/)

        // const wrongOwner = token.safeTransferFrom(account1, account3, 2, {from: accounts[1]}) // wrong owner
        // expect(wrongOwner).to.be.rejectedWith(/VM Exception while processing transaction: revert/)

        // // Noticed that the from gas param needs to be the token owners or it fails
        // const wrongFromGas = token.safeTransferFrom(account2, account3, 2, {from: accounts[1]}) // wrong owner
        // expect(wrongFromGas).to.be.rejectedWith(/VM Exception while processing transaction: revert/)

        await token.safeTransferFrom(account2, account3, 2, {from: accounts[2]})
        expect(await token.ownerOf(2)).to.equal(account3)
    })
})