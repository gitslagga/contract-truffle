// SPDX-License-Identifier: MIT
pragma solidity >0.6.0 <0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract MyContract {
    IERC20 public usdt;

    constructor(IERC20 _usdt) public {
        usdt = _usdt;
    }

    //increase token's amount
    //need user approve usdt token
    function deposit(uint256 amount) external returns (bool) {
        usdt.transferFrom(msg.sender, address(this), amount);
        return true;
    }

    //decrease token's amount
    function withdraw(uint256 amount) external returns (bool) {
        usdt.transfer(msg.sender, amount);
        return true;
    }
}
