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
    // for each of the cat that are returned by the loop, the corresponding cat is 
    // rendered on the Cataloque page via appendCat (see MultiCat/render.js)
    for (i = 0; i < arrayId.length; i++){
        neonCat = await contract.methods.getCat(arrayId[i]).call();
        appendCat(neonCat[0], neonCat["generation"], arrayId[i], onclick)
    }
    console.log(neonCat);
}  

async function getSingleCat(id){
    var neonCat = await contract.methods.getCat(id).call();
    console.log(neonCat);
    var dna = neonCat.genes;
    console.log(dna);
    
    appendBreed(dna, neonCat["generation"], id, "gotoCatDetails(this.id)");
}

// get array of cats of owner, isolate latest id of that array, input that id into
// getSingleCat function below and render newly breeded Cat via function appendBreed on 
// Breeding page (see breeding/breeding.js)
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