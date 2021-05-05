var web3 = new Web3(Web3.givenProvider);

var contract;
var marketplaceContract;
var user;
var contractAddress ="0x35d1D4E225c2d7CEff014bEf7c24434D027AA5ce";
var marketplaceAddress = "0x64cB2e1aabAF75aC15Aa71D4047aa2e0E9AC787F";

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