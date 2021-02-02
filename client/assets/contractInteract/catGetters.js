async function getOwnersCats() {
    var arrayId = await marketplaceContract.methods.getAllTokenOnSale().call();
    var neonCat
    console.log(arrayId);
    for (i = 0; i < arrayId.length; i++) {
        var currentId = arrayId[i]
        if (currentId != 0) {
            neonCat = await contract.methods.getCat(currentId).call();
            var catDetails = await getOffer(currentId)
            console.log(catDetails);
            appendCat(neonCat[0], neonCat["generation"], currentId, "gotoCatDetails(this.id)")

            var priceBtn = `
            <button class="btn btn-dark w-100 rounded-pill"> 
            <h3 class="m-0">`+ getEth(catDetails.price) +  ` ETH</h3>
            </button>`
            $('#' + currentId).find(".featureBox").append(priceBtn)
            if(user.toUpperCase() == catDetails.seller.toUpperCase()){
                $('#catOwner' + currentId).html("is mine")
            } else {
                $('#catOwner' + currentId).html(shortAddr(catDetails.seller))
            }
        }
    }
}

async function getCats(onclick) {
    var neonCat;
    try {
        //get array of IDs
        var arrayId = await contract.methods.getNeonCatsPerOwner(user).call();
        console.log(arrayId)
        for (i = 0; i < arrayId.length; i++) {
            neonCat = await contract.methods.getCat(arrayId[i]).call();
            appendCat(neonCat[0], neonCat["generation"], arrayId[i], onclick)
        }
    } catch (err) {
        console.log(err);
    }
    // for each of the cat that are returned by the loop, the corresponding cat is 
    // rendered on the Cataloque page via appendCat (see MultiCat/render.js)
    
}

async function getSingleCat(id) {
    var neonCat = await contract.methods.getCat(id).call();
    var dna = neonCat.genes;

    appendBreed(dna, neonCat["generation"], id, "gotoCatDetails(this.id)");
}

// get array of cats of owner, isolate latest id of that array, input that id into
// getSingleCat function below and render newly breeded Cat via function appendBreed on 
// Breeding page (see breeding/breeding.js)
async function showNewCat() {
    // define array of cats from owner like in getCats-function above
    var arrayId;
    try {
        //get array of IDs
        arrayId = await contract.methods.getNeonCatsPerOwner(user).call();
        console.log(arrayId);
    } catch (err) {
        console.log(err);
    }
    // isolate/get last number of array
    var newCatId = arrayId[arrayId.length - 1];
    console.log(newCatId);
    var id = newCatId;
    getSingleCat(id);
}

// get offer from marketplace, return false if no offer, otherwise return offer details
async function getOffer(catId) {
    try{
        var catDetails = await marketplaceContract.methods.getOffer(catId).call()
        return catDetails
    } 
    catch(err) {
        alert_msg("something went wrong, please reload and try again", "danger")
        console.log(err)
    }   
}