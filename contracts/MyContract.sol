// SPDX-License-Identifier: MIT
pragma solidity >0.6.0 <0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract MyContract {
    IERC20 usdt;

    constructor(IERC20 _usdt) public {
        usdt = _usdt;
    }

    function deposit(address recipient, uint256 amount) external returns (bool) {
        usdt.transfer(recipient, amount);
        return true;
    }

    function withdraw(address sender, address recipient, uint256 amount) external returns (bool) {
        usdt.transferFrom(sender, recipient, amount);
        return true;
    }
}
