//Get the variables from the url. 
function get_variables() {
    var getParameters = [];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
    function (a, name, value) {
        getParameters[name] = value;      
    });
    return getParameters;
}

  function gotoCatDetails(id){
    window.location.href="/client/catDetails.html?catId="+ id
}

function empty(str){
    if(str.length < 1 || str === undefined || str == ""){
        return true;
    }
    return false;
}

function marketplaceRules(value){
    if(empty(value)){
        alert_msg('Please add a price', 'warning')
        return false
    }
    if(value < 0.01){
        alert_msg('Price needs to be superior to 0.01', 'warning')
        return false
    }
    return true
} 

function alert_msg(message, type) {
    var str = '';
    str += '<div class="alert alert-' + type + ' result-box fit-content mt-3" role="alert">' + message + '<button type="button" class="close ml-2" data-dismiss="alert" aria-label="Close"> <i class="far fa-times-circle"></i> </button></div>';    
    $('body').prepend(str)    
    setTimeout(()=>{
        $('.result-box').fadeOut()
    }, 8000)
}

//ether to wei
function getWei(amount) {
    amount = amount.toString()
    return web3.utils.toWei(amount, "Ether")
}

//Wei to ether
function getEth(amount) {
    amount = amount.toString()
    return web3.utils.fromWei(amount, "Ether")
}

function shortAddr(address){
    var firstPart = address.substr(0, 6);
    var secondPart = address.substr(38, 4);
    var userAddr = firstPart + "...." + secondPart

    return userAddr;
}

async function userBalance() {
    var accounts = await web3.eth.getAccounts()
    var address = accounts[0]
    var balance = await web3.eth.getBalance(address)
    var newbalance = await getEth(balance)
    $('#userBalance').html("Balance:<b class='fw-bolder'> " + numberFix(newbalance) + "</b>")
    $('#userAddr').html("Account:<b class='fw-bolder'> " + shortAddr(address) + "</b>")
    $('#accBox').css("opacity", 1)
}

async function getUserAddress() {
    var accounts = await web3.eth.getAccounts()
    if (accounts.length) return accounts[0]
}

async function showUserInfo(){
    var mynav = document.getElementsByClassName("navbar")
    mynav[0].outerHTML += `
    <div class="row mt-3 p-3 acc-btn" id="accBox">
        <div class="col-lg justify-content-left">
        <button id="userAddr" class="btn btn-light"></button></div>
        <div class="col-lg" align="right">
        <button id="userBalance" class="btn btn-light"></button></div>
    </div>
    `;

    setTimeout(await userBalance, 200);
}

function numberFix(number) {
    return new Intl.NumberFormat('de-DE').format(number)
}

