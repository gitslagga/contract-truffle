// SPDX-License-Identifier: MIT
pragma solidity >0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyContract {
    address payable public _owner;
    IERC20 public _token;
    mapping (address => uint256) public _balances;

    constructor(IERC20 token) public {
        _owner = msg.sender;
        _token = token;
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function changeOwner(address payable owner) external onlyOwner {
        _owner = owner;
    }    

    //increase amount
    function deposit() external payable returns (bool) {
        _balances[msg.sender] += msg.value;
        return true;
    }

    //decrease amount
    function withdraw(uint256 amount) external onlyOwner returns (bool) {
        _owner.transfer(amount);
        return true;
    }

    //increase token's amount
    //need user approve token token
    function depositToken(uint256 amount) external returns (bool) {
        _token.transferFrom(msg.sender, address(this), amount);
        return true;
    }

    //decrease token's amount
    function withdrawToken(uint256 amount) external returns (bool) {
        _token.transfer(msg.sender, amount);
        return true;
    }
}
