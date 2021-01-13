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