// SPDX-License-Identifier: SPDX-License
pragma solidity 0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";
import "./IERC721Receiver.sol";

contract Catscontract is IERC721, Ownable {

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
        uint8 energy; //pending to update formulas returning struct
        string petName; //pending to update formulas returning struct
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
    event UpdateEvent(address indexed owner, uint256 indexed tokenId, uint256 _genesUpdated, uint256 oldGenes);

    uint256 public gen0Counter;

    function breed(uint256 _dadId, uint256 _mumId) public returns (uint256){
        require(_owns(msg.sender, _dadId), "The user doesn't own the token"); // check ownership
        require(_owns(msg.sender, _mumId), "The user doesn't own the token"); // check ownership
        require ((_mumId != _dadId), "Cat IDs can't be the same"); // assure two different cats are chosen for breeding
        // you got the DNA
        // get DNA and generation from mum and dad
        ( uint256 dadDna,,,,uint256 dadGen,, ) = getCat(_dadId);
        ( uint256 mumDna,,,,uint256 mumGen,, ) = getCat(_mumId);
        
        uint256 newDna = _mixDna(dadDna, mumDna);

        // Figure out the generation: Add generation numbers, i.e. Gen0 + Gen1 = Gen1, Gen1 + Gen1 = Gen2, Gen1 + Gen2 = Gen3
        uint256 kidGen = 0;
        if (dadGen < mumGen) {
            kidGen = mumGen + 1;
        } else {
            kidGen = dadGen + 1;
        }
            _createNeonCat( _mumId, _dadId, kidGen, newDna, msg.sender,50,'petname');

    }
    
    // let user create a petName for his (check) cat assuring min4/max20 character length
    function catName(string memory _petName, uint256 _tokenId) public catNameValidator(_petName) {
        require(ownerOf(_tokenId) == msg.sender, "your are not the owner of that Cat");
    // get user input (string) from front-end
    // run checks: _utf8StringLength(), petNameValidator() (DONE)
    // commit/record petName to cat struct (DONE)
        neoncats[_tokenId].petName = _petName;

    }
    
    function _mixDna(uint256 _dadDna, uint256 _mumDna) internal returns (uint256) {
        
        uint256[8] memory geneArray;
        uint256 i = 1;
        uint8 random = uint8( now % 255 ); // yields binary between 00000000-11111111
        uint256 index = 7;
        
        for (i = 1; i <= 128; i=i*2)   {    // 1, 2, 4, 8, 16, 32, 64, 128
            if(random & i != 0){
                geneArray[index] = uint8( _mumDna % 100 );
            }
            else{
                geneArray[index] = uint8( _dadDna % 100 );
            }
            _mumDna = _mumDna / 100;
            _dadDna = _dadDna / 100;

            index = index -1;
        }
        uint256 newGene;
        
        for (i = 0; i < 8; i++){ 
            newGene = newGene + geneArray[i];

            if(i != 7){
                newGene = newGene * 100;
            }
        }
        
        return newGene;
    }    
            

    function supportsInterface(bytes4 _interfaceId) external view returns (bool){
        return ( _interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165 );
        }

    // set mumID, dadID and generation to 0, _genes from input and owner = 0address / msg.sender
    // create var to limit 0 generation to max amount 10, add require and increase counter
    function createCatGen0(uint256 _genes) public onlyOwner returns (uint256){
        require(gen0Counter < supplyLimitGen0);
        // assure no DNA duplicates via a if-condition that stops generation if this condition is not met:  _genes != _existingGenes
        // ??how to access existing genes? --> Birth event?

        gen0Counter++;
        // catEnergy = 50;

        return _createNeonCat(0, 0, 0, _genes, msg.sender,50,'petname');
     }

    function updateCat(uint256 _tokenId, uint256 _genesUpdated) public returns (uint256){
         // assure we get the old DNA for UpdateEvent before changing the attributes
         uint256 oldGenes = neoncats[_tokenId].genes;

        // assuming I get the updated DNA from the front end once the user changed it, this change needs to 
        // enter the blockchain, via a .send method from the front-end:
        /* contract.methods.updateCat(catId, _genesUpdated).send({}, function(error, txHash){
        if(error)
            console.log(error);
        else {
            console.log(txHash); */
        // the "genes" part of the struct of this catId needs to be updated. 
        // how can I overwrite the existing genes info? with a push method?
         neoncats[_tokenId].genes = _genesUpdated;

         // update the catId/object rendering new parts of the dna --> frontEnd / render.js SingleCat

         emit UpdateEvent(owner, _tokenId, _genesUpdated, oldGenes); 
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


    function getCat(uint256 _tokenId) public view returns(
        uint256 genes, 
        uint256 birthTime, 
        uint256 mumId, 
        uint256 dadId, 
        uint256 generation,
        uint8 energy,
        string memory petName
    )
    {        
        return(
            neoncats[_tokenId].genes, 
            neoncats[_tokenId].birthTime, 
            neoncats[_tokenId].mumId, 
            neoncats[_tokenId].dadId, 
            neoncats[_tokenId].generation,
            neoncats[_tokenId].energy,
            neoncats[_tokenId].petName
            );
    }

    // function is private as meant to be executed only from within this contract 
    function _createNeonCat(uint256 _mumId, uint256 _dadId, uint256 _generation, uint256 _genes, address _owner, uint8 _energy, string memory _petName
    ) private returns (uint256){
        Neoncat memory _neoncat = Neoncat({
            genes: _genes,
            birthTime: uint64(now),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation),
            petName: string(_petName),
            energy: uint8(_energy)
        });

           if (_generation == 0){
                _neoncat.energy = 50;
            } else {
                _neoncat.energy = 20;
            }

        uint256 newCatId = neoncats.push(_neoncat) -1;
        
        ownerCats[msg.sender].push(newCatId);

        emit Birth(_owner, newCatId, _mumId, _dadId, _genes);

        _transfer(address(0), _owner, newCatId);

        return newCatId;

    }


    function balanceOf(address _owner) external view returns (uint256 balance){
        return ownershipTokenCount[_owner];
    }

    function totalSupply() public view returns (uint256) {
        return neoncats.length;
    }
  
    function ownerOf(uint256 _tokenId) public view returns (address){
        return catIndexToOwner[_tokenId];
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
        _safeTransfer(_from, _to, _tokenId, "");
        }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) external{
        require( _isApprovedOrOwner(msg.sender, _from, _to, _tokenId) );
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

    function _isApprovedOrOwner(address _spender, address _from, address _to, uint256 _tokenId) internal returns(bool){
        require(_tokenId < neoncats.length); // token must exist
        require(_to != address(0)); // TO address cant be zero address
        require(_owns(_from, _tokenId)); // From owns the token
        // spender is from OR spender is approved for tokenId OR spender is operator for from
        return(_spender == _from || _approvedFor(_spender, _tokenId) || isApprovedForAll(_from, _spender));
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
