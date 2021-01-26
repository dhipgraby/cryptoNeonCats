async function Approve() {

    await contract.methods.setApprovalForAll(marketplaceAddress, true).send()
        .on('receipt', function (receipt) {
            console.log("tx done");
            $('#approveDiv').css('display', 'none')
            var params = get_variables()
            var catId = params.catId
            reloadPanel(catId);
        })
}
// panelHandler for buy/sell/cancell offer, 
//get offer from marketplace, return false if no offer, otherwise return offer details
async function panelHandler(catId) {
    $('#catPrice').val(0)
    var catDetails = await marketplaceContract.methods.getOffer(catId).call()
    var ownership = await contract.methods.ownerOf(catId).call()
    var checkOwner = (ownership.toUpperCase() == user.toUpperCase()) ? true : false
    var forSale = await catDetails.active
        if (checkOwner == true) {
            if (forSale == true) {
        // show "cancel offer"
        $('#cancelBox').removeClass("hidden")
        $('#sellBox').addClass("hidden")       
        $('#buyBox').addClass("hidden")
        } else { 
            var isMarketplaceOperator = await contract.methods.isApprovedForAll(user, marketplaceAddress).call();
            if (isMarketplaceOperator){
        // show "sell box"
        $('#approveDiv').addClass('hidden')
        $('#sellBox').removeClass("hidden")
        $('#cancelBox').addClass("hidden") 
        $('#buyBox').addClass("hidden")
            } else {
                $('#approveDiv').removeClass('hidden')
                }
        // if approveForAll ? continue : singleApprove ? continue : showApproveButton
        
            }
        } else {
            if (forSale == true) {
        // show "buy box" + price in ETH
        $('#buyBox').removeClass("hidden")
        $('#cancelBox').addClass("hidden")
        $('#sellBox').addClass("hidden")       
        $('#priceBtn').html(getEth(catDetails.price) + " ETH")
        } else {
        $('#cancelBox').addClass("hidden")
        $('#sellBox').addClass("hidden")       
        $('#buyBox').addClass("hidden")
        }
    }
    $('#panelHandler').css("opacity", 1)
}

async function reloadPanel(catId){
    setTimeout(await panelHandler(catId), 500)
}

async function createOffer() {
    var params = get_variables()
    var catId = params.catId
    var price = $('#catPrice').val()
    if (marketplaceRules(price) != true) {
        return false
    }
    var amount = getWei(price)
    console.log(amount)
    try {
        await marketplaceContract.methods.setOffer(amount, catId).send()
            .on('receipt', function () {
                alert_msg("Cat offer created successfully", "success")
                reloadPanel(catId)
            })
    } catch (err) {
        console.log(err);
    }
}
async function buyNeonCat() {
    var params = get_variables();
    var catId = params.catId;
    var catDetails = await marketplaceContract.methods.getOffer(catId).call()
    if (catDetails == false || catDetails.length < 1) {
        alert_msg("this cat is not for sale", "danger")
        return false
    }
    try {
        await marketplaceContract.methods.buyCat(catId).send({ value: catDetails.price })
            .once('receipt', function () {
                alert_msg("Cat bought successfully, you are now the new owner of this NeonCat", "success")
                reloadPanel(catId)
            })
    } catch (err) {
        console.log(err);
    }
}

async function cancelOffer() {
    var params = get_variables();
    var catId = params.catId;
    var catDetails = await marketplaceContract.methods.getOffer(catId).call()
    if (catDetails == false || catDetails.length < 1) {
        alert_msg("this cat is not for sale", "danger")
        return false
    }
    try {
        await marketplaceContract.methods.removeOffer(catId).send()
            .once('receipt', function () {
                alert_msg("Offer removed successfully from Marketplaces", "success")
                reloadPanel(catId)
            })
    } catch (err) {
        console.log(err);
    }
}



