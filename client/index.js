var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress ="0xB09A657a484d7F71816F82C24879cE79e442633d";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];

        console.log(instance);

        instance.createCatGen0(dnaStr).send()
    })
})