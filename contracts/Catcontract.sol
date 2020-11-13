// SPDX-License-Identifier: SPDX-License

pragma solidity 0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";

contract Catscontract is IERC721, Ownable {

    uint256 public constant supplyLimitGen0 = 50;
    string public constant name = "Neoncats";
    string public constant symbol = "NC";

    struct Cats {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    NeonCat[] neoncats;

    mapping(uint256 => address) public catIndexToOwner;
    mapping(address => uint256) ownershipTokenCount;
    mapping(uint256 => bool) private tokenExists;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event Birth(address owner, uint256 newCatId, uint256 mumId, uint256 dadId, uint256 genes);

    uint256 public gen0Counter;

    // set mumID, dadID and generation to 0, _genes from input and owner = 0address / msg.sender
    // create var to limit 0 generation to max amount X, add require and increase counter
    function createCatGen0(uint256 _genes) public onlyOwner returns (uint256){
        require(gen0Counter <= supplyLimitGen0);

        gen0Counter++;

        returns _createNeonCat(0, 0, 0, _genes, msg.sender);
         
        
    }

    // function is private as meant to be executed only from within our own contract 
    function _createNeonCat(uint256 _mumId, uint256 _dadId, uint256 _generation, address _owner
    ) private returns (uint256){
        NeonCat memory _neoncat = NeonCat({
            genes: _genes,
            birthTime: uint64(now),
            momId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        })

        uint256 newCatId = neoncats.push(_neoncat) -1;

        emit Birth(_owner, newCatId, _mumId, _dadId, _genes);

        _transfer(address(0), _owner, newCatId);

        return newCatId;
    }
    )
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
        require(tokenExists[_tokenId]);
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
        require(tokenExists[_tokenId]);
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