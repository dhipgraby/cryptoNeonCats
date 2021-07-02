// SPDX-License-Identifier: SPDX-License

pragma solidity 0.5.12;

contract Ownable{
    
    address public owner;

    modifier canBreed(uint energy){
        require(energy >= 20, "minimum energy level for breeding is 20 units");
        _;
    }
    
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

       // validate string petName checking if min/max length is met
    modifier catNameValidator(string memory str) {
        
        uint length = _utf8StringLength(str);
        
        require(length <= 20, "Petname too long, length is limited to 20 characters");
        require(length >= 3, "Petname too short, please assure a minimum of 3 characters");
        _;
    }
    
    // get string length of user-chosen cat name (front-end)
    function _utf8StringLength(string memory str) private pure returns (uint) {
        return bytes(str).length;
    }
    

}