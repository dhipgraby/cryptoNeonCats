var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress ="0xa1ED836d71508C15e27253B321AaF21de2d919d6";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];

        console.log(instance);
    })
})

function createNeonCat(){
        instance.methods.createCatGen0(dnaStr).send({}, function(error, txHash){
            var dnaStr = getDna();
            if(err)
                console.log(err);
            else{
                console.log(txHash);
            }
        })
    }

