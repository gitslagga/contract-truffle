// SPDX-License-Identifier: MIT
pragma solidity >0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SlotMachine {
    address payable private _owner;
    uint256 private _price;
    
    mapping(string => uint256) private _multiple;
    
    // event SlotPlay(string id, address player, );
    
    constructor() public {
        _owner = msg.sender;
        _price = 1;
        
        // apple, orange, mango, bell, watermelon, star, seven, bar
        // 2, 4, 5, 8, 10, 15, 20, 25
        _multiple["apple"] = 2;
        _multiple["orange"] = 4;
        _multiple["mango"] = 5;
        _multiple["bell"] = 8;
        _multiple["watermelon"] = 10;
        _multiple["star"] = 15;
        _multiple["seven"] = 20;
        _multiple["bar"] = 25;
    }
    
    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
    
    function getOwner() public view returns (address) {
        return _owner;
    }

    function getPrice() public view returns (uint256) {
        return _price;
    }
    
    function getMultiple(string memory goal) public view returns (uint256) {
        return _multiple[goal];
    }

    function changeOwner(address payable owner) public onlyOwner returns (bool) {
        _owner = owner;
        return true;
    }

    function changePrice(uint256 price) public onlyOwner returns (bool) {
        _price = price;
        return true;
    }

    function play(bytes32[] memory goal, bytes32[] memory amount) public returns (bool) {
        require(goal.length == amount.length, "goal and amount length do not match.");
        
        //TODO play game
    }
    
    function testByte(bytes32 gola) public pure returns (string memory) {
        return string(abi.encodePacked(gola));
    }
    
    
    function testString(string memory gola) public pure returns (bytes32) {
        
        return bytes32(gola);
    }
}