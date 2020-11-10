// SPDX-License-Identifier: SPDX-License

pragma solidity 0.7.0.;

import "./IERC721.sol";

contract Kittycontract is IERC721 {
    
    string public constant name = "NeonCats";
    string public constant symbol = "NC";

    struct NCats {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    NCats[] cats;
    
    mapping(uint256 => address) public tokenOwners;
    mapping(uint256 => bool) private tokenExists; 
    mapping(address => uint256) ownershipTokenCount;



    /** * @dev Emitted when `tokenId` token is transfered from `from` to `to`.*/
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    /** * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token. */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);


    function balanceOf(address owner) external view returns (uint256 balance){
        return ownershipTokenCount[owner];
    }
    function totalSupply() external view returns (uint256 total){
        return tokenOwners.length();
    }
    function name() external view returns (string memory tokenName){
        return _name;
    }
    function symbol() external view returns (string memory tokenSymbol){
        return _symbol;
    }
    function ownerOf(uint256 tokenId) external view returns (address owner){
        require(tokenExists[_tokenId]);
        return tokenOwners[_tokenId];
    }
    /* @dev Transfers `tokenId` token from `msg.sender` to `to`.
     * Requirements:
     * - `to` cannot be the zero address.
     * - `to` can not be the contract address.
     * - `tokenId` token must be owned by `msg.sender`.
     * Emits a {Transfer} event.*/

    function transfer(address to, uint256 tokenId) external{
        address currentOwner = msg.sender;
        address newOwner = _to;
        
        require(tokenExists[_tokenId]);
        require(currentOwner == ownerOf(_tokenId));
        require(currentOwner != newOwner);
        require(recipient != address(0));

        ownershipTokenCount[newOwner] += 1; 
        ownershipTokenCount[currentOwner] -= 1;

        emit Transfer(from, to, tokenId);
    }

    


}