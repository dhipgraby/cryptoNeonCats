
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 48,
    "mouthColor" : 10,
    "eyesShape" : 1,
    "pupilColor" : 3,
    "earsColor" : 30,
    //Cattributes
    "decorationPattern" : 1,
    "decorationMidColor" : 4,
    "decorationSidesColor" : 3,
    "animation" : 5,
    "lastNum" : 1
    }

// when page load
$( document ).ready(function() {
   $('#dnabody').html(defaultDNA.headcolor)
   $('#dnamouth').html(defaultDNA.mouthColor)
   $('#dnashape').html(defaultDNA.eyesShape)
   $('#dnapupils').html(defaultDNA.pupilColor)
   $('#dnaears').html(defaultDNA.earsColor)
   $('#dnadecoration').html(defaultDNA.decorationPattern)
   $('#dnadecorationMid').html(defaultDNA.decorationMidColor)
   $('#dnadecorationSides').html(defaultDNA.decorationSidesColor)
   $('#dnaanimation').html(defaultDNA.animation)
   $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

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

// Changing cat colors
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