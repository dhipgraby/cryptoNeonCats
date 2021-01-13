var web3 = new Web3(Web3.givenProvider);

var contract;
var marketplaceContract;
var user;
var contractAddress ="0xD4080e35B55E971528B15066342C9697D3d4De76";
var marketplaceAddress = "0x0FAfEAA7F13Aa9dD61E739f627DD17C19738B62C";

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

    async function Approve() {
        
            await contract.methods.setApprovalForAll(marketplaceAddress, true).send().on('receipt', function(receipt){
                console.log("tx done");
                $('#approveDiv').css('display', 'none')
                getOwnersCats();
            })
    }
    
    async function getOwnersCats() {
        var arrayId = await marketplaceContract.methods.getAllTokenOnSale().call();
        console.log(arrayId);
        for (i = 0; i < arrayId.length; i++) {
            if(arrayId[i] != 0){
                appendCat(arrayId[i])
            }            
        }
    }


async function getCats(onclick){
    var arrayId;
    var neonCat; 
    try{
        //get array of IDs
        arrayId = await contract.methods.getNeonCatsPerOwner(user).call();
        console.log(arrayId);
    }   catch(err){
        console.log(err);
    }
    // for each of the cat that are returned by the loop, the corresponding cat is rendered on the Webpage via appendCat
    for (i = 0; i < arrayId.length; i++){
        neonCat = await contract.methods.getCat(arrayId[i]).call();
        appendCat(neonCat[0], neonCat["generation"], arrayId[i], onclick)
    }
    console.log(neonCat);
}  


$('#breedButton').click(async () => {
    let mumId = $('#selectedMum').val()
    let dadId = $('#selectedDad').val()
    if(empty(mumId) || empty(dadId)) {
        alert("cat ID(s) missing, please select a mother and father cat for breeding")
        return false
    }

    await contract.methods.breed(dadId, mumId).send({}, function(error, txHash){
            
        if(error)
            console.log(error);
        else {
            console.log(txHash);
            
        showNewCat();

        }
    })
})

async function showNewCat() {
    // define array of cats from owner like in getCats-function above
    var arrayId;
    try{
        //get array of IDs
        arrayId = await contract.methods.getNeonCatsPerOwner(user).call();
        console.log(arrayId);
    }   catch(err){
        console.log(err);
    }
        // isolate/get last number of array
        var newCatId = arrayId[arrayId.length -1];
        console.log(newCatId);
        var id = newCatId;
        getSingleCat(id);
}

async function getSingleCat(id){
    var neonCat = await contract.methods.getCat(id).call();
    console.log(neonCat);
    var dna = neonCat.genes;
    console.log(dna);
    appendBreed(dna, neonCat["generation"], id, "null");
    
}


function empty(str){
    if(str.length < 1 || str === undefined || str == ""){
        return true;
    }
    return false;
}

async function sellCat(id){
    var price = $('#catPrice').val()
    var amount = web3.utils.toWei(price, "ether")
    try{
        await marketplaceContract.methods.setOffer(amount, id).send();
    } catch (err) {
        console.log(err);
    }
}
async function buyNeonCat(id, price){
    var amount = web3.utils.toWei(price, "ether")
    try{
        await marketplaceContract.methods.buyCat(amount, id).send();
    } catch (err) {
        console.log(err);
    }
}
async function checkOffer(id){
    let res;
    try{
        res = await marketplaceContract.methods.getOffer(id).call();
        var price = res['price'];
        var seller = res['seller'];
        var onsale = true
        // If price more than 0 means that cat is for sale
        if(price > 0){
            onsale = true 
        }
        //Also might check that belong to someone
        price = Web3.utils.fromWei(price, 'ether');
        var offer = { seller: seller, price: price, onsale: onsale }
        return offer
                
    }   catch (err) {
        console.log(err);
        return
    }
}


//Get the variables from the url. 
function get_variables() {
    var getParameters = [];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
    function (a, name, value) {
        getParameters[name] = value;      
    });
    return getParameters;
  }


