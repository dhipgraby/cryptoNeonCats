async function Approve() {
        
    await contract.methods.setApprovalForAll(marketplaceAddress, true).send().on('receipt', function(receipt){
        console.log("tx done");
        $('#approveDiv').css('display', 'none')
        getOwnersCats();
    })
}
// with isolated id from above get single cat and render newly breeded cat on breeding.html

async function createOffer(id){
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