
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 48,
    "mouthColor" : 10,
    "eyesShape" : 1,
    "pupilColor" : 11,
    "earsColor" : 30,
    //Cattributes
    "decorationPattern" : 1,
    "decorationMidColor" : 30,
    "decorationSidesColor" : 17,
    "animation" : 1,
    "lastNum" : 1
    }

// when page load
$( document ).ready(function() {

    renderCat(defaultDNA)
});

function randomDna(){
    // create a random DNA number with a fixed amount of 16 digits, remove decimals
    var dnaStr = String(Math.floor(Math.random() * 1E16));
    //console.log(randomDNA);
    var dna = {
        "headcolor" : dnaStr.substring(0, 2),
        "mouthColor" : dnaStr.substring(2, 4),
        "eyesShape" : dnaStr.substring(4, 5) % 8 + 1,
        "pupilColor" : dnaStr.substring(5, 7),
        "earsColor" : dnaStr.substring(7, 9),
        "decorationPattern" : dnaStr.substring(9, 10) % 4 + 1,
        "decorationMidColor" : dnaStr.substring(10, 12),
        "decorationSidesColor" : dnaStr.substring(12, 14),
        "animation" : dnaStr.substring(14, 15) % 7 + 1
        //"lastNum" : dnaStr.substring(6, 7)
        }
        return dna
    }

function randomCat(){
    var dna = randomDna()
    renderCat(dna)
}

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnashape').html()
    dna += $('#dnapupils').html()
    dna += $('#dnaears').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)

    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthColor').val(dna.mouthColor)

    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)

    pupilColor(colors[dna.pupilColor],dna.pupilColor)
    $('#pupilcolor').val(dna.pupilColor)

    earColor(colors[dna.earsColor],dna.earsColor)
    $('#earcolor').val(dna.earsColor)

    decorationVariation(dna.decorationPattern)
    $('#decoshape').val(dna.decorationPattern)

    decorationColorSides(colors[dna.decorationSidesColor],dna.decorationSidesColor)
    $('#decosidecolors').val(dna.decorationSidesColor)

    decorationColorMid(colors[dna.decorationMidColor],dna.decorationMidColor)
    $('#decomidcolor').val(dna.decorationMidColor)

    animationVariation(dna.animation)
    $('#animation').val(dna.animation)
}

// Listeners - Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})
$('#mouthcolor').change(()=>{
    var colorVal = $('#mouthcolor').val()
    mouthColor(colors[colorVal],colorVal)
})
$('#eyeshape').on("change",()=>{
    var shape = parseInt($('#eyeshape').val())
    eyeVariation(shape)
})
$('#pupilcolor').change(()=>{
    var colorVal = $('#pupilcolor').val()
    pupilColor(colors[colorVal],colorVal)
})
$('#earcolor').change(()=>{
    var colorVal = $('#earcolor').val()
    earColor(colors[colorVal],colorVal)
})
// Changing cattributes
$('#decoshape').change(()=>{
    var shape = parseInt( $('#decoshape').val() )
    decorationVariation(shape)
})
$('#decosidecolors').change(()=>{
    var colorVal = $('#decosidecolors').val()
    decorationColorSides(colors[colorVal],colorVal)
})
$('#decomidcolor').change(()=>{
    var colorVal = $('#decomidcolor').val()
    decorationColorMid(colors[colorVal],colorVal)
})
$('#animation').change(()=>{
    var animationVal = parseInt( $('#animation').val() )
    animationVariation(animationVal)
})

/*
// CLICK LISTENERS FOR HTML BUTTONS

// 1. create Cat Gen 0 
--> as it interacts with the blockchain, this function was moved to index.js file
$('#createButton').click(()=>{
    createCat();
})    */

// 2. default Cat
$('#defaultButton').click(()=>{
    renderCat(defaultDNA);
})

// 3. random Cat
$('#randomButton').click(()=>{
    randomCat();
})
