// SPDX-License-Identifier: SPDX-License

pragma solidity 0.5.12;

contract Ownable{
    
    address public owner;
    
    modifier onlyOwner(){
        require(msg.sender == owner);
        _; // continue execution
        }
        
     modifier validAddress(address checkAddress){
        require(checkAddress != address(0));
        _; // continue execution
        }   
    
    constructor() public{
        owner = msg.sender;
    }
    
    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

}