const GameItem = artifacts.require("GameItem");

contract('Testing ERC721 contract', async function(accounts) {

    const name = "GameItem";
    const symbol = "ITM";

    const account1 = accounts[1];
    const tokenUri1 = "This is data for the token 1"; // Does not have to be unique

    const account2 = accounts[2];
    const tokenUri2 = "This is data for the token 2"; // Does not have to be unique

    const account3 = accounts[3];

    it(' should be able to deploy and mint ERC721 token', async () => {
        const token = await GameItem.deployed();
        const tokenId = await token.awardItem(account1, tokenUri1, {from: accounts[0]});

        assert.equal(await token.symbol(), symbol);
        assert.equal(await token.name(), name);
        // assert.equal(tokenId, 1)
    })

    it(' should allow creation of multiple unique tokens and manage ownership', async () => {
        const token = await GameItem.deployed();
        await token.awardItem(account2, tokenUri2, {from: accounts[0]});

        assert.equal(Number(await token.totalSupply()), 2);

        assert.equal(await token.tokenURI(1), tokenUri1);
        assert.equal(await token.tokenURI(2), tokenUri2);
        // assert.equal(await token.tokenURI(9999), /VM Exception while processing transaction: revert ERC721Metadata: URI query for nonexistent token/)

        assert.equal(await token.ownerOf(1), account1);
        assert.equal(await token.ownerOf(2), account2);
    })

    it(' should allow safe transfers', async () => {
        const token = await GameItem.deployed();
        // const unownedTokenId = token.safeTransferFrom(account2, account3, 1, {from: accounts[2]}); // tokenId
        // assert.equal(unownedTokenId, /VM Exception while processing transaction: revert/);

        // const wrongOwner = token.safeTransferFrom(account1, account3, 2, {from: accounts[1]}); // wrong owner
        // assert.equal(wrongOwner, /VM Exception while processing transaction: revert/);

        // // Noticed that the from gas param needs to be the token owners or it fails
        // const wrongFromGas = token.safeTransferFrom(account2, account3, 2, {from: accounts[1]}); // wrong owner
        // assert.equal(wrongFromGas, /VM Exception while processing transaction: revert/);

        await token.safeTransferFrom(account2, account3, 2, {from: accounts[2]});
        assert.equal(await token.ownerOf(2), account3);
    })
})