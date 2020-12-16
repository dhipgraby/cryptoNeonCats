// Append each Cat card as a catalog entry

$(document).ready(
    setTimeout(() => {
        getCats()
    }, 1000)
    )


function appendCat(dna, id) {
    //1 return DNA cat into readable string
    var NeonCatDna = catDna(dna)
    //2 build the catBox into HTML
    catBox(id)
    //3 Render the cats CSS style dpeending on DNA string
    renderCat(NeonCatDna, id)
    $('#catDNA' + id).html(`
        <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b> 0</h4></span>
        <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna +`</h4></span>
    `) 
}

// Apply cat CSS Styles from buildCat.js
function renderCat(dna, id){
    headColor(dna.headColor, id)
    mouthColor(dna.mouthColor, id)
    eyeVariation(dna.eyesShape, id)
    pupilColor(dna.pupilColor, id)
    earsColor(dna.earsColor, id)
    console.log(dna.decorationPattern);
    decorationVariation(dna.decorationPattern, id)
    decorationColorMid(dna.decorationMidColor, id)
    decorationColorSides(dna.decorationSidesColor, id)
    animationVariation(dna.animation, id)
}

//83 04 7 73 93 3 99 43 4 - 444220853261843

function catDna(dnaStr){
    var dna = {
        //Colors
        "headColor" : dnaStr.substring(0, 2),
        "mouthColor" : dnaStr.substring(2, 4),
        "eyesShape" : dnaStr.substring(4, 5),
        "pupilColor" : dnaStr.substring(5, 7),
        "earsColor" : dnaStr.substring(7, 9),
        //Attributes
        "decorationPattern" : dnaStr.substring(9, 10),
        "decorationMidColor" : dnaStr.substring(10, 12),
        "decorationSidesColor" : dnaStr.substring(12, 14),
        "animation" : dnaStr.substring(14, 15)
    }
    return dna
}


function catBox(id) {

    var catDiv = `<div class="col-xl-4 pointer fit-content">
                <div class="featureBox catDiv">
                
                    <div id="ears`+ id + `" class="cat__ear">
                        <div id="leftEar`+ id + `" class="cat__ear--left">
                            <div class="ear-whisker1left"></div>
                            <div class="ear-whisker2left"></div>
                            <div class="cat__ear--left-inside"></div>
                        </div>
                        <div id="rightEar`+ id + `" class="cat__ear--right">
                            <div class="ear-whisker1right"></div>
                            <div class="ear-whisker2right"></div>
                            <div class="cat__ear--right-inside"></div>
                        </div>   
                    </div>
                    <div id="head`+ id + `" class="cat__head">
                        <div class="cat__head-zoneBlur"></div>
                        <div id="midDot`+ id + `" class="cat__head-dots">
                            <div id="leftDot`+ id + `" class="cat__head-dots_first"></div>
                            <div id="rightDot`+ id + `" class="cat__head-dots_second"></div> 
                        </div>

                        <div class="cat__eye-left-zoneblur"></div>
                        <div class="cat__eye-right-zoneblur"></div>

                        <div class="cat__eye">
                            <div id="leftTwinkle`+ id + `" class="cat__eye--left"></div>
                            <div id="rightTwinkle`+ id + `" class="cat__eye--right"></div>
                        </div>
                        
                        <div id="pupL-off`+ id + `" class="pupil-left"></div>
                        <div id="refL-off`+ id + `" class="reflex-left"></div>
                        
                        <div id="pupR-off`+ id + `" class="pupil-right"></div>
                        <div id="refR-off`+ id + `" class="reflex-right"></div>
                        
                        
                        <div class="cat__nose"></div>
                        

                        <div class="cat__mouth-contour" id="mouth-contour`+ id + `">

                            <div class="mouth-container">
                                <div id="MouthLimit`+ id + `" class="square">

                                </div>
                                <div class="ellipse">
                                    <div class="tongue"></div>
                                    <div class="tooth tooth1"></div>
                                    <div class="tooth tooth2"></div>
                                    </div>
                                </div>  
                            <div class="whisker__1left"></div>
                            <div class="whisker__2left"></div>
                            <div class="whisker__3left"></div>

                            <div class="whisker__1right"></div>
                            <div class="whisker__2right"></div>
                            <div class="whisker__3right"></div>
                        </div>
                    </div>
                    <div class="cat__body">
                        <div class="cat__chest" id="chest`+ id + `"></div>
                        <div class="cat__chest_inner" id="chest_inner`+ id + `"></div>

                        <div id="cat__pawL`+ id + `" class="cat__paw-left">
                            <div class="cat__paw-shadowL">
                                <div id="claw" class="claw claw_pl1"></div>
                                <div id="claw" class="claw claw_pl2"></div>
                                <div id="claw" class="claw claw_pl3"></div>
                            </div>
                        </div>

                        <div id="cat__stompL`+ id + `" class="cat__paw-left_inner">
                            <div id="clawsInnerL`+ id + `" class="cat__paw-shadowInnerL">
                                <div id=clawsL class="clawsL claws__left1"></div>
                                <div id=clawsL class="clawsL claws__left2"></div>
                                <div id=clawsL class="clawsL claws__left3"></div>
                            </div>
                        </div>

                        <div id="cat__pawR`+ id + `" class="cat__paw-right">
                            <div class="cat__paw-shadowR">
                                <div id="claw" class="claw claw_pr1"></div>
                                <div id="claw" class="claw claw_pr2"></div>
                                <div id="claw" class="claw claw_pr3"></div>
                            </div>
                        </div>
                        
                        <div id="cat__stompR`+ id + `" class="cat__paw-right_inner">
                            <div id="clawsInnerR`+ id + `" class="cat__paw-shadowInnerR">
                                <div id=clawsR class="clawsR claws__right1"></div>
                                <div id=clawsR class="clawsR claws__right2"></div>
                                <div id=clawsR class="clawsR claws__right3"></div>
                            </div>
                        </div>
                            
                        <div id="tail`+ id + `" class="cat__tail">
                            <div class="tail__arrow">
                                <div class="tail__whisker tail__whiskerLeft"></div>
                                <div class="tail__whisker tail__whiskerRight"></div>
                            </div>
                        </div> <br><br><br><br><br>
                            <div class="dnaDiv" id="catDNA`+ id + `"></div>

                        <ul class="ml-5 cattributes">
                            <li><span id="eyeName`+ id + `"></span> eyes</li>
                            <li><span id="decoName`+ id + `"></span> decoration</li>
                            <li><span id="animationName`+ id + `"></span> animation </li>
                        </ul>
                        
                    </div>
                </div>
            </div>`
    
    $('#catsDiv').append(catDiv)


}



