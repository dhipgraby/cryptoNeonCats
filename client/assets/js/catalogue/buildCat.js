// CSS properties to build each cat depending on the DNA

var colors = Object.values(allColors())

function headColor(code, id){
    var color = colors[code]
    $('#head' + id + ', #chest' + id).css('background', '#' + color)
}

function mouthColor(code, id){
    var color = colors[code]
    $('#mouth-contour' + id + ', #chest_inner' + id + ', #tail' + id).css('background', '#' + color)
    $('#MouthLimit' + id).css('background', '#' + color)
}

function eyeVariation(num, id){
    $('#dnashape').html(num)
    num = parseInt(num);
    switch (num) {
        case 1:
            normalEyes(id)
            $('#eyeName' + id).html('Green')
            normalEyes(id)
            break
        case 2: 
            normalEyes(id)
            $('#eyeName' + id).html('Orange')
            eyesType1(id)
            break
        case 3: 
            normalEyes(id)
            $('#eyeName' + id).html('Blue')
            eyesType2(id)
            break
        case 4: 
            normalEyes(id)
            $('#eyeName' + id).html('Yellow')
            eyesType3(id)
            break
        case 5: 
            normalEyes(id)
            $('#eyeName' + id).html('Red')
            eyesType4(id)
            break
        case 6: 
            normalEyes(id)
            $('#eyeName' + id).html('Black')
            eyesType5(id)
            break
        case 7: 
            normalEyes(id)
            $('#eyeName' + id).html('Grey')
            eyesType6(id)
            break
        case 8: 
            normalEyes(id)
            $('#eyeName' + id).html('Pink')
            eyesType7(id)
            break
        }

        //green (default)
        async function normalEyes(id){
        $('#eye-right' + id).css({ 'background-image': gradients[0].right })
        $('#eye-left' + id).css({ 'background-image': gradients[0].left })
        }
        //orange
        function eyesType1(id) {
            $('#eye-right' + id).css({ 'background-image': gradients[1].right })
            $('#eye-left' + id).css({ 'background-image': gradients[1].left })
        }
        //blue 
        function eyesType2(id) {
            $('#eye-right' + id).css({ 'background-image': gradients[2].right })
            $('#eye-left' + id).css({ 'background-image': gradients[2].left })
        }
        //yellow
        function eyesType3(id) {
            $('#eye-right' + id).css({ 'background-image': gradients[3].right })
            $('#eye-left' + id).css({ 'background-image': gradients[3].left })
        }
        //red
        function eyesType4(id) {
            $('#eye-right' + id).css({ 'background-image': gradients[4].right })
            $('#eye-left' + id).css({ 'background-image': gradients[4].left })
        }
        //black
        function eyesType5(id) {
            $('#eye-right' + id).css({ 'background-image': gradients[5].right })
            $('#eye-left' + id).css({ 'background-image': gradients[5].left })
        }
        //grey
        function eyesType6(id) {
            $('#eye-right' + id).css({ 'background-image': gradients[6].right })
            $('#eye-left' + id).css({ 'background-image': gradients[6].left })
        }
        //pink
        function eyesType7(id) {
            $('#eye-right' + id).css({ 'background-image': gradients[7].right })
            $('#eye-left' + id).css({ 'background-image': gradients[7].left })
        }
    }

function pupilColor(code, id) {
    var color = colors[code]
    $('#pupL-off' + id + ', #pupR-off' + id).css('background', '#' + color)
}

function earsColor(code, id) {
    var color = colors[code]
    $('#leftEar' + id + ', #rightEar' + id + ', #cat__pawL' + id + ', #cat__stompL' + id + ', #cat__pawR' + id + ', #cat__stompR' + id).css('background', '#' + color)
}

// Don't know how to build same challenge as eyeVariation function
//function decorationVariation(num){
//    $('#dnadecoration').html(num)
// unfinished
//}

// 4 decoration types
function decorationVariation(num, id) {
    $('#dnadecoration').html(num)
    num = parseInt(num);
    switch (num) {
        case 1:
            $('#decoName' + id).html('Basic')
            normaldecoration(id)
            break
        case 2:
            //normaldecoration(id)
            $('#decoName' + id).html('Spread')
            decoVar1(id)
            break
        case 3:
            //normaldecoration(id)
            $('#decoName' + id).html('Long Mid')
            decoVar2(id)
            break
        case 4:
            //normaldecoration(id)
            $('#decoName' + id).html('Narrow')
            decoVar3(id)
            break
    }
}
    async function normaldecoration(id) {
        //Remove all style from other decorations
        //In this way we can also use normalDecoration() to reset the decoration style
            $('#midDot' + id).css( dVariations[0].dots )
            $('#leftDot' + id).css( dVariations[0].dots_first )
            $('#rightDot' + id).css( dVariations[0].dots_second )
        }
        //spread
        function decoVar1(id) {
            $('#midDot' + id).css( dVariations[1].dots )
            $('#leftDot' + id).css( dVariations[1].dots_first )
            $('#rightDot' + id).css( dVariations[1].dots_second )
        }
        //long mid
        function decoVar2(id) {
            $('#midDot' + id).css( dVariations[2].dots )
            $('#leftDot' + id).css( dVariations[2].dots_first )
            $('#rightDot' + id).css( dVariations[2].dots_second )
        }
        // spread narrow
        function decoVar3(id) {
            $('#midDot' + id).css( dVariations[3].dots )
            $('#leftDot' + id).css( dVariations[3].dots_first )
            $('#rightDot' + id).css( dVariations[3].dots_second )
        }

function decorationColorMid(code, id) {
    var color = colors[code]
   // $('#midDot' + id).css('background', '#' + color)
}

function decorationColorSides(code, id) {
    var color = colors[code]
   // $('#leftDot' + id + ', #rightDot' + id).css('background', '#' + color)
}


// Don't know how to build same challenge as eyeVariation function
//function animationVariation(num){
//    $('#dnaanimation').html(num)
// unfinished

// Animation
function animationVariation(num, id) {
    $('#dnaanimation').html(num)
    num = parseInt(num);
    switch (num) {
        case 1:
            animationReset(id)
            $('#animationName' + id).html('No Animation')
            animationReset(id)
            break
        case 2:
            animationReset(id)
            $('#animationName' + id).html('Jumping Head')
            animationVar1(id)
            break
        case 3:
            animationReset(id)
            $('#animationName' + id).html('Move Ears')
            animationVar2(id)
            break
        case 4:
            animationReset(id)
            $('#animationName' + id).html('Move Tail')
            animationVar3(id)
            break
        case 5:
            animationReset(id)
            $('#animationName' + id).html('Grow claws')
            animationVar4(id)
            break
        case 6:
            animationReset(id)
            $('#animationName' + id).html('Twinkling Eyes')
            animationVar5(id)
            break
        case 7:
            animationReset(id)
            $('#animationName' + id).html('Gangnam Style')
            animationVar6(id)
            break
    }
    
}
    function animationReset(id){
        $("#head" + id).removeClass("jumpingHead")
        $("#leftEar" + id).removeClass("movingLeftEar")
        $("#rightEar" + id).removeClass("movingRightEar")
        $("#tail" + id).removeClass("movingTail")
        $("#claw" + id).removeClass("growingClaws")
        $("#clawsL" + id).removeClass("growingClawsInner")
        $("#clawsR" + id).removeClass("growingClawsInner")
        $("#leftTwinkle" + id).removeClass("twinklingEyes")
        $("#rightTwinkle" + id).removeClass("twinklingEyes")
        $("#pupL-off" + id).removeClass("disappear")
        $("#refL-off" + id).removeClass("disappear")
        $("#pupR-off" + id).removeClass("disappear")
        $("#refR-off" + id).removeClass("disappear")
        $("#cat__pawL" + id).removeClass("gangnamStyleL")
        $("#cat__pawR" + id).removeClass("gangnamStyleR")
        $("#cat__stompL" + id).removeClass("gangnamStompL")
        $("#cat__stompR" + id).removeClass("gangnamStompR")
        $("#head" + id).removeClass("gangnamHeadMove")
        $("#ears" + id).removeClass("gangnamEarsMove")
    }
    function animationVar1(id){
        $("#head" + id).addClass("jumpingHead")
    }
    function animationVar2(id){
        $("#leftEar" + id).addClass("movingLeftEar")
        $("#rightEar" + id).addClass("movingRightEar")
    }
    function animationVar3(id){
        $("#tail" + id).addClass("movingTail")
    }
    // claws of the front paws
    function animationVar4(id){
        $("#claw" + id).addClass("growingClaws")
        $("#clawsL" + id).addClass("growingClawsInner")
        $("#clawsR" + id).addClass("growingClawsInner")
    }
    function animationVar5(id){
        $("#leftTwinkle" + id).addClass("twinklingEyes")
        $("#rightTwinkle" + id).addClass("twinklingEyes")
        $("#pupL-off" + id).addClass("disappear")
        $("#refL-off" + id).addClass("disappear")
        $("#pupR-off" + id).addClass("disappear")
        $("#refR-off" + id).addClass("disappear")
    }
    function animationVar6(id){
        $("#cat__pawL" + id).addClass("gangnamStyleL")
        $("#cat__pawR" + id).addClass("gangnamStyleR")
        $("#cat__stompL" + id).addClass("gangnamStompL")
        $("#cat__stompR" + id).addClass("gangnamStompR")
        $("#head" + id).addClass("gangnamHeadMove")
        $("#ears" + id).addClass("gangnamEarsMove")
    }