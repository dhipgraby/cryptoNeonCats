var web3 = new Web3(Web3.givenProvider);

var contract;
var marketplaceContract;
var user;
var contractAddress ="0xD97b8EfEBDfDc4B16e197c06076EEee3baECC926";
var marketplaceAddress = "0xEB3A939Fd7B6aE8C15Cf80b439aF45ebd15Af476";

$(document).ready(function(){
    window.ethereum.enable().then(async function(accounts){
        contract = new web3.eth.Contract(abi.catContract, contractAddress, {from: accounts[0]})
        marketplaceContract = new web3.eth.Contract(abi.marketplace, marketplaceAddress, {from: accounts[0]})
        user = accounts[0];
        
        
        $('#createButton').click(()=>{

            var dnaStr = getDna().toString();
        
            contract.methods.createCatGen0(dnaStr).send({}, function(error, txHash){
            
                if(error)
                    console.log(error);
                else {
                    console.log(txHash);
                }
            })
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
            var eventType = eent.returnValues["TxType"].toString()
            var tokenId = efent.returnValues["tokenId"]
            if(eventType == "Buy") {
                alert_msg('Cat purchased successfully! The NeonCat with TokenID: ' + tokenId, ' is now yours')
            }
            if(eventType == "Create offer") {
                alert_msg('Cat id: ' + tokenId + ' offer successfully added to marketplace')
                $('#clearBox').removeClass('hidden')
                $('#clearBtn').attr('onclick', 'deleteOffer(' + tokenId + ')')
                $('#sellBtn').attr('onclick', '')
                $('#sellBtn').addClass('btn-breed')
                $('#sellBtn').html('<b>For sale</b>')
                var price = $('#catPrice').val()
                $('#catPrice').val(price)
                $('#catPrice').prop('readonly', true)
            }
            if(evenType == "Delete offer"){
                alert_msg('Cat id: ' + tokenId + ' offer successfully removed from marketplace')
                $('#clearBox').addClass('hidden')
                $('#clearBtn').attr('onclick', '')
                $('#sellBtn').attr('onclick', 'sellCat(' + tokenId + ')')
                $('#sellBtn').removeClass('btn-warning')
                $('#sellBtn').addClass('btn-success')
                $('#sellBtn').html('<b>Sell this Cat</b>')
                $('#catPrice').val('')
                $('#catPrice').prop('readonly', false)
            }
        })
        .on('error', console.error);

    })
})