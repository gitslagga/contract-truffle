// SPDX-License-Identifier: MIT
pragma solidity >0.5.10 <0.8.0;

contract SlotMachine {
    address payable private _owner;
    uint256 private _price;
    
    mapping(bytes32 => uint256) private _multiple;
    
    // event SlotPlay(string id, address player, );
    
    constructor() {
        _owner = msg.sender;
        _price = 1;

        // apple, orange, mango, bell, watermelon, star, seven, bar
        // 2, 4, 5, 8, 10, 15, 20, 25
        _multiple[0x6170706c65000000000000000000000000000000000000000000000000000000] = 2;  //apple
        _multiple[0x6f72616e67650000000000000000000000000000000000000000000000000000] = 4;  //orange
        _multiple[0x6d616e676f000000000000000000000000000000000000000000000000000000] = 5;  //mango
        _multiple[0x62656c6c00000000000000000000000000000000000000000000000000000000] = 8;  //bell
        _multiple[0x77617465726d656c6f6e00000000000000000000000000000000000000000000] = 10; //watermelon
        _multiple[0x7374617200000000000000000000000000000000000000000000000000000000] = 15; //star
        _multiple[0x736576656e000000000000000000000000000000000000000000000000000000] = 20; //seven
        _multiple[0x6261720000000000000000000000000000000000000000000000000000000000] = 25; //bar
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
    
    function getMultiple(bytes32 source) public view returns (uint256) {
        return _multiple[source];
    }

    function changeOwner(address payable owner) public onlyOwner returns (bool) {
        _owner = owner;
        return true;
    }

    function changePrice(uint256 price) public onlyOwner returns (bool) {
        _price = price;
        return true;
    }

    function play(bytes32[] memory source, uint256[] memory amount) public payable returns (bool) {
        require(source.length == amount.length, "source and amount length do not match.");
        
        //TODO play game
    }
    
    function convertBytes32ToString(bytes32 source) public pure returns (string memory) {
        bytes memory tempSource = new bytes(32);
        
        for (uint i=0; i<32; i++) {
            tempSource[i] = source[i];
        }

        return string(tempSource);
    }
    
    
    function convertStringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempSource = bytes(source);

        if (tempSource.length == 0) {
            return 0x0;
        }
    
        assembly {
            result := mload(add(source, 32))
        }
    }
}