var web3 = new Web3(Web3.givenProvider);

var contract;
var marketplaceContract;
var user;
var contractAddress ="0xA778d86330A0dd0E33699A697276bfe5a1fAa299";
var marketplaceAddress = "0x22860Ea50F41dBCAC286adD5e115be1aa18898fd";

$(document).ready(function(){
    window.ethereum.enable().then(async function(accounts){
        contract = new web3.eth.Contract(abi.catContract, contractAddress, {from: accounts[0]})
        marketplaceContract = new web3.eth.Contract(abi.marketplace, marketplaceAddress, {from: accounts[0]})
        user = accounts[0];
        showUserInfo();
        
        
        contract.events.Birth().on('data', function(event){
            let owner = event.returnValues.owner;
            let newCatId = event.returnValues.newCatId;
            let mumId = event.returnValues.mumId;
            let dadId = event.returnValues.dadId;
            let genes = event.returnValues.genes
            $("#CatCreation").css("display", "block");
            $("#CatCreation").text("owner: " + owner 
                                    +" newCatId " + newCatId
                                    +" mumId " + mumId
                                    +" dadId " + dadId
                                    +" genes " + genes)
        })
        .on('error', console.error)  

        marketplaceContract.events.MarketTransaction().on('data', function(event){
        })
        .on('error', console.error);

    })
})