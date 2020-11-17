
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
    $('.cat__mouth-contour, .cat__chest_inner, .cat__tail').css('background', '#' + color)  //This changes the color of the cat
    $('#MouthLimit').css('background', '#' + color)
    $('#mouthcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Green')
            break
        case 2: 
            normalEyes()
            $('#eyeName').html('Orange')
            eyesType1()
            break
        case 3: 
            normalEyes()
            $('#eyeName').html('Blue')
            eyesType2()
            break
        case 4: 
            normalEyes()
            $('#eyeName').html('Yellow')
            eyesType3()
            break
        case 5: 
            normalEyes()
            $('#eyeName').html('Red')
            eyesType4()
            break
        case 6: 
            normalEyes()
            $('#eyeName').html('Black')
            eyesType5()
            break
        case 7: 
            normalEyes()
            $('#eyeName').html('Grey')
            eyesType6()
            break
        case 8: 
            normalEyes()
            $('#eyeName').html('Pink')
            eyesType7()
            break
    }
}
//green (default) rgb(9, 255, 0)
async function normalEyes() { 
    $('.cat__eye--left').css({ 'background-image': 'linear-gradient(to bottom left, rgb(41, 41, 40), rgb(57, 255, 20))' })
    $('.cat__eye--right').css({ 'background-image': 'linear-gradient(to bottom left, rgb(57, 255, 20), rgb(41, 41, 40))' })
}
//orange rgb(255, 191, 0)
function eyesType1() {
    $('.cat__eye--left').css({ 'background-image': 'linear-gradient(to bottom left, rgb(41, 41, 40), rgb(255, 191, 0)) '})
    $('.cat__eye--right').css({ 'background-image': 'linear-gradient(to bottom left, rgb(255, 191, 0), rgb(41, 41, 40))'})
}
//blue rgb(84, 255, 249)
function eyesType2() {
    $('.cat__eye--left').css({ 'background-image': 'linear-gradient(to bottom left, rgb(41, 41, 40), rgb(84, 255, 249)) '})
    $('.cat__eye--right').css({ 'background-image': 'linear-gradient(to bottom left, rgb(84, 255, 249), rgb(41, 41, 40))'})
}
//yellow rgb(252, 252, 141)
function eyesType3() {
    $('.cat__eye--left').css({ 'background-image': 'linear-gradient(to bottom left, rgb(41, 41, 40), rgb(252, 240, 3) )'})
    $('.cat__eye--right').css({ 'background-image': 'linear-gradient(to bottom left, rgb(252, 240, 3), rgb(41, 41, 40) )'})
}
//red rgb(255, 117, 119)
function eyesType4() {
    $('.cat__eye--left').css({ 'background-image': 'linear-gradient(to bottom left, rgb(41, 41, 40), rgb(255, 117, 119) )'})
    $('.cat__eye--right').css({ 'background-image': 'linear-gradient(to bottom left, rgb(255, 117, 119), rgb(41, 41, 40)) '})
}
//black rgb(2, 0, 0)
function eyesType5() {
    $('.cat__eye--left').css({ 'background-image': 'linear-gradient(to bottom left, rgb(41, 41, 40), rgb(2, 0, 0)) '})
    $('.cat__eye--right').css({ 'background-image': 'linear-gradient(to bottom left, rgb(2, 0, 0), rgb(41, 41, 40) )'})
}
//grey rgb(130, 130, 130)
function eyesType6() {
    $('.cat__eye--left').css({ 'background-image': 'linear-gradient(to bottom left, rgb(41, 41, 40), rgb(130, 130, 130) )'})
    $('.cat__eye--right').css({ 'background-image': 'linear-gradient(to bottom left, rgb(130, 130, 130), rgb(41, 41, 40) )'})
}
//pink rgb(255, 23, 254)
function eyesType7() {
    $('.cat__eye--left').css({ 'background-image': 'linear-gradient(to bottom left, rgb(41, 41, 40), rgb(255, 23, 254) )'})
    $('.cat__eye--right').css({ 'background-image': 'linear-gradient(to bottom left, rgb(255, 23, 254), rgb(41, 41, 40) )'})
}

function pupilColor(color,code) {
    $('.pupil-left, .pupil-right').css('background', '#' + color)  //This changes the pupil color of the cat's eyes
    $('#eyecode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnapupils').html(code) //This updates the body color part of the DNA that is displayed below the cat
} 

function earColor(color,code) {
    $('.cat__ear--left, .cat__ear--right, .cat__paw-left, .cat__paw-left_inner, .cat__paw-right, .cat__paw-right_inner' ).css('background', '#' + color)  //This changes the color of the cat
    $('#earcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

// cattributes

// 4 decoration types
async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "80px", "width": "6px", "top": "1px", "border-radius": "50% 50% 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "60px", "width": "5px", "top": "3px", "left": "-20px", "border-radius": "50% 50% 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "60px", "width": "5px", "top": "3px", "left": "20px", "border-radius": "50% 50% 50% 50%" })
}
function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decoName').html('Basic')
            normaldecoration()
            break
        case 2:
            $('#decoName').html('Spread')
            decoVar1()
            break
        case 3:
            $('#decoName').html('Long Mid')
            decoVar2()
            break
        case 4:
            $('#decoName').html('Narrow')
            decoVar3()
            break
    }
}
//spread
function decoVar1() {
    $('.cat__head-dots').css({'top': '1px','width': '8px', 'height': '80x', 'left': '108px', 'border-radius': '50% 50% 50% 50%' })
    $('.cat__head-dots_first').css({'top': '-10px', 'width': '8px', 'height': '87px', 'left': '-38px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(45deg)' })
    $('.cat__head-dots_second').css({'top':'-10px', 'width': '8px', 'height': '87px', 'left': '41px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(-45deg)' })
}
//long mid
function decoVar2() {
    $('.cat__head-dots').css({'height': '95px', 'width': '11px', 'border-radius': '50% 50% 50% 50%' })
    $('.cat__head-dots_first').css({'top': '-3px', 'width': '8px', 'height': '38px', 'left': '-21px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(45deg)' })
    $('.cat__head-dots_second').css({'top':'-3px', 'width': '8px', 'height': '38px', 'left': '24px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(-45deg)' })
}
// spread narrow
function decoVar3() {
    $('.cat__head-dots').css({'height': '101px', 'width': '8px', 'border-radius': '50% 50% 50% 50%' })
    $('.cat__head-dots_first').css({'top': '-2px', 'width': '8px', 'height': '92px', 'left': '-22px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(20deg)' })
    $('.cat__head-dots_second').css({'top':'-2px', 'width': '8px', 'height': '92px', 'left': '23px', 'border-radius': '50% 50% 50% 50%', 'transform': 'rotate(-20deg)' })
}

// decoration color Mid
function decorationColorMid(color,code) {
    $('.cat__head-dots').css('background', '#' + color)
    $('#decoColorMid').html('code: '+code) 
    $('#dnadecorationMid').html(code) 
}

// deocration color Sides
function decorationColorSides(color,code) {
    $('.cat__head-dots_first, .cat__head-dots_second').css('background', '#' + color)
    $('#decoColorSides').html('code: '+code) 
    $('#dnadecorationSides').html(code)
}

// Animation
function animationVariation(num) {
    $('#dnaanimation').html(num)
    switch (num) {
        case 1:
            animationReset()
            $('#animationName').html('No Animation')
            break
        case 2:
            animationReset()
            $('#animationName').html('Jumping Head')
            animationVar1()
            break
        case 3:
            animationReset()
            $('#animationName').html('Move Ears')
            animationVar2()
            break
        case 4:
            animationReset()
            $('#animationName').html('Move Tail')
            animationVar3()
            break
        case 5:
            animationReset()
            $('#animationName').html('Grow claws')
            animationVar4()
            break
        case 6:
            animationReset()
            $('#animationName').html('Twinkling Eyes')
            animationVar5()
            break
        case 7:
            animationReset()
            $('#animationName').html('Gangnam Style')
            animationVar6()
            break
    }
    
}
function animationReset(){
    $("#head").removeClass("jumpingHead")
    $("#leftEar").removeClass("movingLeftEar")
    $("#rightEar").removeClass("movingRightEar")
    $("#tail").removeClass("movingTail")
    $(".claw").removeClass("growingClaws")
    $(".clawsL").removeClass("growingClawsInner")
    $(".clawsR").removeClass("growingClawsInner")
    $("#leftTwinkle").removeClass("twinklingEyes")
    $("#rightTwinkle").removeClass("twinklingEyes")
    $("#pupL-off").removeClass("disappear")
    $("#refL-off").removeClass("disappear")
    $("#pupR-off").removeClass("disappear")
    $("#refR-off").removeClass("disappear")
    $("#cat__pawL").removeClass("gangnamStyleL")
    $("#cat__pawR").removeClass("gangnamStyleR")
    $("#cat__stompL").removeClass("gangnamStompL")
    $("#cat__stompR").removeClass("gangnamStompR")
    $("#head").removeClass("gangnamHeadMove")
    $("#ears").removeClass("gangnamEarsMove")
}
function animationVar1(){
    $("#head").addClass("jumpingHead")
}
function animationVar2(){
    $("#leftEar").addClass("movingLeftEar")
    $("#rightEar").addClass("movingRightEar")
}
function animationVar3(){
    $("#tail").addClass("movingTail")
}


// claws of the front paws
function animationVar4(){
    $(".claw").addClass("growingClaws")
    $(".clawsL").addClass("growingClawsInner")
    $(".clawsR").addClass("growingClawsInner")

}

function animationVar5(){
    $("#leftTwinkle").addClass("twinklingEyes")
    $("#rightTwinkle").addClass("twinklingEyes")
    $("#pupL-off").addClass("disappear")
    $("#refL-off").addClass("disappear")
    $("#pupR-off").addClass("disappear")
    $("#refR-off").addClass("disappear")
}
function animationVar6(){
    $("#cat__pawL").addClass("gangnamStyleL")
    $("#cat__pawR").addClass("gangnamStyleR")
    $("#cat__stompL").addClass("gangnamStompL")
    $("#cat__stompR").addClass("gangnamStompR")
    $("#head").addClass("gangnamHeadMove")
    $("#ears").addClass("gangnamEarsMove")
}
