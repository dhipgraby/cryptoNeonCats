// SPDX-License-Identifier: SPDX-License

pragma solidity ^0.7.0;

contract Helloworld {
    string public message = "Helloworld";
    
    function getMessage() public view returns (string memory _message){
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
