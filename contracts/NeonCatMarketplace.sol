pragma solidity 0.5.12;

import "./Catcontract.sol";
import "./Ownable.sol";
import "./INeonCatMarketplace.sol";

contract NeonCatMarketplace is Ownable, INeonCatMarketplace {
    Catscontract private _catContract;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

        Offer[] offers;

        mapping(uint256 => Offer) tokenIdToOffer;


    event MarketTransaction(string TxType, address owner, uint256 tokenId);

    constructor(address _catContractAddress) public {
        setNeonCatContract(_catContractAddress);
    }

    function setNeonCatContract(address _catContractAddress) public onlyOwner {
        _catContract = Catscontract(_catContractAddress);
    }
    
    

    function getOffer(uint256 _tokenId) external view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active ) 
    {    
        Offer storage offer = tokenIdToOffer[_tokenId];

        return (offer.seller, offer.price, offer.index, offer.tokenId, offer.active);
    }

    function getAllTokenOnSale() external view returns(uint256[] memory listOfOffers){
        uint256 totalOffers = offers.length;
        
            if(totalOffers == 0){
                return new uint256[](0);
            } else {

                uint256[] memory result = new uint256[](totalOffers);

                uint256 offerId;

                for (offerId = 0; offerId < totalOffers; offerId++) {
                    if(offers[offerId].active == true){
                        result[offerId] = offers[offerId].tokenId;                
                        }
                }
             
               return result;
            }
            
    }     

    function _ownsCat(address _address, uint256 _tokenId) internal view returns (bool) {
        return(_catContract.ownerOf(_tokenId) == _address);
    }  

    function setOffer(uint256 _price, uint256 _tokenId) external {
        require(_ownsCat(msg.sender, _tokenId), "your are not the owner of that Cat");
        require(tokenIdToOffer[_tokenId].active == false, "You can't sell twice the same offer"); // what is the argument for "twice"??
        // the token must be "active" for it to be sold, where is this checked?¿ this checks for active to be false ?¿?¿?¿?
        //why isn't he checking if the offer is active? 
        require(_catContract.isApprovedForAll(msg.sender, address(this)), "Contract needs to be approved to transfer the Cat");
        
        Offer memory _offer = Offer({
            seller: msg.sender,
            price: _price,
            index: offers.length,
            tokenId: _tokenId,
            active: true
        });

        tokenIdToOffer[_tokenId] = _offer;
        offers.push(_offer); 

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    function removeOffer(uint256 _tokenId) public {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(offer.seller == msg.sender, "You are not the seller of that kitty");
        
        delete tokenIdToOffer[_tokenId];
        offers[tokenIdToOffer[_tokenId].index].active = false;

        emit MarketTransaction("Remove offer", msg.sender, _tokenId);
    }

    function buyKitty(uint256 _tokenId) external payable{
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(msg.value == offer.price, "The price is incorrect");
        require(tokenIdToOffer[_tokenId].active == true, "Presently no active offer for this Cat");

        // Important: delete the Cat from the mapping BEFORE paying out to prevent reentry attack
        delete tokenIdToOffer[_tokenId];
        offers[offer.index].active = false;

        // Transfer the funds to the seller
        if(offer.price > 0) {
            offer.seller.transfer(offer.price);
        }

        // Transfer ownership to the new owner
        _catContract.transferFrom(offer.seller, msg.sender, _tokenId);

        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }

}