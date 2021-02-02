var web3 = new Web3(Web3.givenProvider);

var contract;
var marketplaceContract;
var user;
var contractAddress ="0xF70590821c6d0C303741512aF744c0dea13a6157";
var marketplaceAddress = "0x2f90F28f6de98990d5d66e6679877331BeA2eCd6";

$(document).ready(function(){
    window.ethereum.enable().then(async function(accounts){
        contract = new web3.eth.Contract(abi.catContract, contractAddress, {from: accounts[0]})
        marketplaceContract = new web3.eth.Contract(abi.marketplace, marketplaceAddress, {from: accounts[0]})
        user = accounts[0];
        showUserInfo();
        
        $('#createButton').click(async ()=>{

            var dnaStr = getDna().toString();
            try{
                await contract.methods.createCatGen0(dnaStr).send()
                .on('receipt', function (receipt) {
                    console.log(receipt);
                    alert_msg("Cat created successfully", "success")
                })
            }
            catch(err){
                console.log(err)
            }
        })

        contract.events.Birth().on('data', function(event){
            console.log(event);
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
            console.log(event);
        })
        .on('error', console.error);

    })
})