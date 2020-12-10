// CSS properties to build each cat depending on the DNA

var colors = Object.values(allColors())

function headColor(code, id){
    var color = colors[code]
    $('.cat__head' + id + ', .cat__chest' + id).css('background', '#' + color)
}

function mouthColor(code, id){
    var color = colors[code]
    $('.cat__mouth-contour' + id + ', .cat__chest_inner' + id + ', .cat__tail' + id).css('background', '#' + color)
    $('#MouthLimit' + id).css('background', '#' + color)
}
// Dont know how to build this one, as eyes separated into L/R and different gradient values.
//propuesta: crear un objeto al igual que "colors" pero con "gradients", pero como distiguir entre L/R
function eyeVariation(num, id){
    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes(id)
            $('#eyeName' + id).html('Green')
            return normalEyes(id)
            break
        case 2: 
            eyesType1(id)
            $('#eyeName' + id).html('Orange')
            return eyesType1(id)
            break
        case 3: 
            eyesType2(id)
            $('#eyeName' + id).html('Blue')
            return eyesType2(id)
            break
        case 4: 
            eyesType3(id)
            $('#eyeName' + id).html('Yellow')
            return eyesType3(id)
            break
        case 5: 
            eyesType4(id)
            $('#eyeName' + id).html('Red')
            return eyesType4(id)
            break
        case 6: 
            eyesType5(id)
            $('#eyeName' + id).html('Black')
            return eyesType5(id)
            break
        case 7: 
            eyesType6(id)
            $('#eyeName' + id).html('Grey')
            return eyesType6(id)
            break
        case 8: 
            eyesType7(id)
            $('#eyeName' + id).html('Pink')
            return eyesType7(id)
            break
        }

        //green (default)
        async function normalEyes(id){
        $('.cat__eye--left' + id + ', .cat__eye--right' + id).css({ 'background-image': gradients[0] })
        }
        //orange
        function eyesType1(id) {
        $('.cat__eye--left' + id + ', .cat__eye--right' + id).css({ 'background-image': gradients[1] })
        }
        //blue 
        function eyesType2(id) {
        $('.cat__eye--left' + id + ', .cat__eye--right' + id).css({ 'background-image': gradients[2] })
        }
        //yellow
        function eyesType3(id) {
        $('.cat__eye--left' + id + ', .cat__eye--right' + id).css({ 'background-image': gradients[3] })
        }
        //red
        function eyesType4(id) {
        $('.cat__eye--left' + id + ', .cat__eye--right' + id).css({ 'background-image': gradients[4] })
        }
        //black
        function eyesType5(id) {
        $('.cat__eye--left' + id + ', .cat__eye--right' + id).css({ 'background-image': gradients[5] })
        }
        //grey
        function eyesType6(id) {
        $('.cat__eye--left' + id + ', .cat__eye--right' + id).css({ 'background-image': gradients[6] })
        }
        //pink
        function eyesType7(id) {
        $('.cat__eye--left' + id + ', .cat__eye--right' + id).css({ 'background-image': gradients[7] })
        }
    }

function pupilColor(color,code) {
    var color = colors[code]
    $('.pupil-left' + id + ', .pupil-right' + id).css('background', '#' + color)
}

function earColor(color,code) {
    var color = colors[code]
    $('.cat__ear--left' + id + ', .cat__ear--right' + id + ', .cat__paw-left' + id + ', .cat__paw-left_inner' + id + ', .cat__paw-right' + id + ', .cat__paw-right_inner' + id ).css('background', '#' + color)
}

// Don't know how to build same challenge as eyeVariation function
//function decorationVariation(num){
//    $('#dnadecoration').html(num)
// unfinished
//}

// 4 decoration types
function decorationVariation(num, id) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            normaldecoration(id)
            $('#decoName' + id).html('Basic')
            return normaldecoration(id)
            break
        case 2:
            decoVar1(id)
            $('#decoName' + id).html('Spread')
            return decoVar1(id)
            break
        case 3:
            decoVar2(id)
            $('#decoName' + id).html('Long Mid')
            return decoVar2(id)
            break
        case 4:
            decoVar3(id)
            $('#decoName' + id).html('Narrow')
            return decoVar3(id)
            break
    }
}
    async function normaldecoration(id) {
        //Remove all style from other decorations
        //In this way we can also use normalDecoration() to reset the decoration style
        $('.cat__head-dots' + id + '.cat__head-dots_first' + id + '.cat__head-dots_second' + id).css({ dVariation:0 })
        }
        //spread
        function decoVar1(id) {
            $('.cat__head-dots' + id + '.cat__head-dots_first' + id + '.cat__head-dots_second' + id).css({ dVariation:1 })
        }
        //long mid
        function decoVar2(id) {
            $('.cat__head-dots' + id + '.cat__head-dots_first' + id + '.cat__head-dots_second' + id).css({ dVariation:2 })
        }
        // spread narrow
        function decoVar3(id) {
            $('.cat__head-dots' + id + '.cat__head-dots_first' + id + '.cat__head-dots_second' + id).css({ dVariation:3 })
        }

function decorationColorMid(color,code) {
    var color = colors[code]
    $('.cat__head-dots' + id).css('background', '#' + color)
}

function decorationColorSides(color,code) {
    var color = colors[code]
    $('.cat__head-dots_first' + id + ', .cat__head-dots_second' + id).css('background', '#' + color)
}


// Don't know how to build same challenge as eyeVariation function
//function animationVariation(num){
//    $('#dnaanimation').html(num)
// unfinished

// Animation
function animationVariation(num) {
    $('#dnaanimation').html(num)
    switch (num) {
        case 1:
            animationReset(id)
            $('#animationName').html('No Animation')
            return animationReset(id)
            break
        case 2:
            animationVar1(id)
            $('#animationName').html('Jumping Head')
            return animationVar1(id)
            break
        case 3:
            animationVar2(id)
            $('#animationName').html('Move Ears')
            return animationVar2(id)
            break
        case 4:
            animationVar3(id)
            $('#animationName').html('Move Tail')
            return animationVar3(id)
            break
        case 5:
            animationVar4(id)
            $('#animationName').html('Grow claws')
            return animationVar4(id)
            break
        case 6:
            animationVar5(id)
            $('#animationName').html('Twinkling Eyes')
            return animationVar5(id)
            break
        case 7:
            animationVar6(id)
            $('#animationName').html('Gangnam Style')
            return animationVar6(id)
            break
    }
    
}
    function animationReset(id){
        $("#head" + id).removeClass("jumpingHead")
        $("#leftEar" + id).removeClass("movingLeftEar")
        $("#rightEar" + id).removeClass("movingRightEar")
        $("#tail" + id).removeClass("movingTail")
        $(".claw" + id).removeClass("growingClaws")
        $(".clawsL" + id).removeClass("growingClawsInner")
        $(".clawsR" + id).removeClass("growingClawsInner")
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
        $(".claw" + id).addClass("growingClaws")
        $(".clawsL" + id).addClass("growingClawsInner")
        $(".clawsR" + id).addClass("growingClawsInner")
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