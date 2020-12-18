// SPDX-License-Identifier: SPDX-License

pragma solidity 0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";
import "./IERC721Receiver.sol";

contract Catscontract is IERC721, Ownable, IERC721Receiver {

    uint256 public constant supplyLimitGen0 = 10;
    string public constant name = "Neoncats";
    string public constant symbol = "NC";
    
    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")); 

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

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
    
    mapping(uint256 => address) public neonCatIndexToApproved;
    mapping(address => mapping (address => bool)) private _operatorApprovals;
    
    event Birth(address owner, uint256 newCatId, uint256 mumId, uint256 dadId, uint256 genes);
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    uint256 public gen0Counter;

    function supportsInterface(bytes4 _interfaceId) external view returns (bool){
        return ( _interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165 );
        }

    // set mumID, dadID and generation to 0, _genes from input and owner = 0address / msg.sender
    // create var to limit 0 generation to max amount 10, add require and increase counter
    function createCatGen0(uint256 _genes) public onlyOwner returns (uint256){
        require(gen0Counter < supplyLimitGen0);
        // assure no DNA duplicates via a if-condition that stops generation if this condition is not met:  _genes != _existingGenes
        // ¿how to access existing genes? --> Birth event?

        gen0Counter++;

        return _createNeonCat(0, 0, 0, _genes, msg.sender);
     }

    function getNeonCatsPerOwner(address _owner) external view returns (uint [] memory){
        uint[] memory result = new uint[](ownershipTokenCount[_owner]);
        uint counter = 0;
        for(uint i = 0; i < neoncats.length; i++){
            if (catIndexToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
   /* function getCatIdsPerOwner() public view returns (uint [] memory){
        return ownerCats[msg.sender];
    }
    */

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

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
        _safeTransfer(_from, _to, _tokenId, "");
        }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) external{
        require(_isApprovedOrOwner(msg.sender, _from, _to, _tokenId));
        _safeTransfer(_from, _to, _tokenId, _data);
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require( _checkERC721Support(_from, _to, _tokenId, _data) );
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns (bool) {
        if( !_isContract(_to) ){
            return true;
        }
        //Call onERC721Received in the _to contract
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
        // Check return value
        return returnData == MAGIC_ERC721_RECEIVED;    
        }

    function _isContract(address _to) view internal returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function _isApprovedOrOwner(address _spender, address _from, address _to, uint256 _tokenId) internal{
        require(_tokenId < neoncats.length); // token must exist
        require(_to != address(0)); // TO address cant be zero address
        require(_owns(_from, _tokenId)); // From owns the token
        // spender is from OR spender is approved for tokenId OR spender is operator for from
        require(_spender == _from || _approvedFor(_spender, _tokenId) || isApprovedForAll(_from, _spender));
    }

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
            delete neonCatIndexToApproved[_tokenId];
        }

        emit Transfer(_from, _to, _tokenId);
    }

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool){
        return (catIndexToOwner[_tokenId] == _claimant);
    }
    function isApprovedForAll(address owner, address operator) public view returns (bool){
        return _operatorApprovals[owner][operator];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        require( _isApprovedOrOwner(msg.sender, _from, _to, _tokenId) );

        _transfer(_to, _from, _tokenId);
    }
        function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
            return neonCatIndexToApproved[_tokenId] == _claimant;
        }
   


    function approve(address _to, uint256 _tokenId) external {
        require(_owns(msg.sender, _tokenId));

        _approve(_to, _tokenId);
        emit Approval(msg.sender, _to, _tokenId);
        }
    
        function _approve(address approved, uint256 _tokenId) internal {
            neonCatIndexToApproved[_tokenId] = approved;
        }
        
    function getApproved(uint256 _tokenId) public view returns (address) {
        require(_tokenId < neoncats.length); // token must exist
        
        return neonCatIndexToApproved[_tokenId];
    }

    function setApprovalForAll(address operator, bool approved) external {
        require(msg.sender != operator);

        _setApprovalForAll(operator, approved);
        emit ApprovalForAll(msg.sender, operator, approved);
    }
        function _setApprovalForAll(address operator, bool approved) internal {
            _operatorApprovals[msg.sender][operator] = approved;
            
        }
    
}
