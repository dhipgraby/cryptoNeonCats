// SPDX-License-Identifier: SPDX-License

pragma solidity 0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";

contract Catscontract is IERC721, Ownable {

    uint256 public constant supplyLimitGen0 = 13;
    string public constant name = "Neoncats";
    string public constant symbol = "NC";

    struct Neoncat {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Neoncat[] neoncats;

    mapping(uint256 => address) public catIndexToOwner;
    mapping(address => uint256) ownershipTokenCount;
    mapping(address => uint256[]) public ownerCats;
    

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event Birth(address owner, uint256 newCatId, uint256 mumId, uint256 dadId, uint256 genes);

    uint256 public gen0Counter;

    // set mumID, dadID and generation to 0, _genes from input and owner = 0address / msg.sender
    // create var to limit 0 generation to max amount X, add require and increase counter
    function createCatGen0(uint256 _genes) public onlyOwner returns (uint256){
        require(gen0Counter <= supplyLimitGen0);

        gen0Counter++;

        return _createNeonCat(0, 0, 0, _genes, msg.sender);
     }

    function getCat(uint256 _tokenId) public view returns(uint256 genes, uint256 birthTime, uint256 mumId, uint256 dadId, uint256 generation){        
        
        //Neoncat storage neoncat = neoncats[_tokenId];

        return(neoncats[_tokenId].genes, neoncats[_tokenId].birthTime, neoncats[_tokenId].mumId, neoncats[_tokenId].dadId, neoncats[_tokenId].generation);
    }

    // function is private as meant to be executed only from within this contract 
    function _createNeonCat(uint256 _mumId, uint256 _dadId, uint256 _generation, uint256 _genes, address _owner
    ) private returns (uint256){
        Neoncat memory _neoncat = Neoncat({
            genes: _genes,
            birthTime: uint64(now),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });

        // is the same as 
        // _neoncat.genes = genes;
        // _neoncat.birthTime = uint64(now); etc.

        uint256 newCatId = neoncats.push(_neoncat) -1;
        ownerCats[msg.sender].push(newCatId);

        emit Birth(_owner, newCatId, _mumId, _dadId, _genes);

        _transfer(address(0), _owner, newCatId);

        return newCatId;
    }
    
    /*
    // create an array of all catIds
    uint[] private arrayOfCatIds;

    // query the above array and get all catIds of a single owner/address
    function ownedCats() public view returns (uint256 [] memory){
        require(address = msg.sender);

        for(i = 0, i <= objects.length, i++) {
        uint objects = objects[i];

            if(object){

            }   
        }
    }*/

    function balanceOf(address owner) external view returns (uint256 balance){
        return ownershipTokenCount[owner];
    }

    function totalSupply() public view returns (uint256) {
        return neoncats.length;
    }
     /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 _tokenId) external view returns (address){
        return catIndexToOwner[_tokenId];
    }

     /* @dev Transfers `tokenId` token from `msg.sender` to `to`.
     *
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `to` can not be the contract address.
     * - `tokenId` token must be owned by `msg.sender`.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address _to, uint256 _tokenId) external{
        require(_to != address(0));
        require(_to != address(this));
        require(_owns(msg.sender, _tokenId));

        _transfer(msg.sender, _to, _tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;

        catIndexToOwner[_tokenId] = _to;

        if (_from != address(0)) {
            ownershipTokenCount[_from]--;
        }

        emit Transfer(_from, _to, _tokenId);
    }

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool){
        return (catIndexToOwner[_tokenId] == _claimant);
    }



}