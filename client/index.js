var web3 = new Web3(Web3.givenProvider);

var contract;
var user;
var contractAddress ="0x731157D970bdC418B9E742B68BDcaaCa531F54d0";

$(document).ready(function(){
    window.ethereum.enable().then(async function(accounts){
        contract = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
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
    })
})

async function getCats(callback){
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
        appendCat(neonCat[0], neonCat["generation"], arrayId[i], callback)
    }
    console.log(neonCat);
}  

async function getSingleCat(id){
    var neonCat = await contract.methods.getCat(id).call();
    console.log(neonCat);
    appendCat(neonCat[0], neonCat["generation"], id)
}

$('#breedButton').click(async () =>{
    let mumId = $('#selectedMum').val()
    let dadId = $('#selectedDad').val()
    if(empty(mumId) || empty(dadId)) {
        alert("cat ID(s) missing")
        return false
    }

    await contract.methods.breed(dadId, mumId).send({}, function(error, txHash){
            
        if(error)
            console.log(error);
        else {
            console.log(txHash);
        }
    })
})
function empty(str){
    if(str.length < 1 || str === undefined || str == ""){
        return true;
    }
    return false;
}