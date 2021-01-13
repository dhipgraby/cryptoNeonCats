var colorsTab = $('#colorsTab');
var catColors = $('#catColors');

var catAttributes = $('#catAttributes');
var attributesTab = $('#attributesTab');



function showCatColors(){

if(catColors.hasClass("hidden")){
    
    catColors.removeClass("hidden")
    colorsTab.addClass("active")

    catAttributes.addClass("hidden")
    attributesTab.removeClass("active")      

  }

}

function showCatAttributes(){
 
  if(catAttributes.hasClass("hidden")){
      
    catAttributes.removeClass("hidden")
    attributesTab.addClass("active")      

    catColors.addClass("hidden")
    colorsTab.removeClass("active")         

  }

}

/* function gotoCatDetails(){

}
*/