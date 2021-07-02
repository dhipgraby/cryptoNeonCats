var web3 = new Web3(Web3.givenProvider);

var contract;
var marketplaceContract;
var user;
var contractAddress ="0x551AE62600d7a3A0a4DCFD7571880cF636a4D8Df";
var marketplaceAddress = "0x90a4BAD60130B306d0b208b4870f56B9141da457";

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