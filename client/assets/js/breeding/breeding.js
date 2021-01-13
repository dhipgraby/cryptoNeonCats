$('#breedButton').click(async () => {
    let mumId = $('#selectedMum').val()
    let dadId = $('#selectedDad').val()
    if(empty(mumId) || empty(dadId)) {
        alert("cat ID(s) missing, please select a mother and father cat for breeding")
        return false
    }

    await contract.methods.breed(dadId, mumId).send({}, function(error, txHash){
            
        if(error)
            console.log(error);
        else {
            console.log(txHash);
        // added a timeout of 5 seconds to make breeding more realistic
        // need to add some gimmick to show breeding is in process
        setTimeout (() => { showNewCat(); }, 5000);

        }
    })
})

// female by default is "false"
  var gender = false;

      function selectCat(id){
        if(gender == true){
          $("#selectedDad").val(id)
        }else {
          $("#selectedMum").val(id)
        }
          $("#catModal").modal("hide")
      }
      function setMum(){
      gender = false;
      }
      function setDad(){
      gender = true;
      }


      function appendBreed(dna, generation, id, onclick) {
        //1 return DNA cat into readable string
        var NeonCatDna = catDna(dna)
        //2 build the catBox into HTML
        catBreedBox(id, onclick)
      
            renderCat(NeonCatDna, "New")
            $('#catIdNumberNew').html(`
                <div align="center">
                    <span class="text-center badge badge-light">
                    <h4 class="tsp-2 m-0"><b>ID: </b>`+ id +`</h4></span>
                </div>
                <br><br>
            `)
            $('#catDNANew').html(`
                <span class="badge badge-light mb-2">
                <h4 class="tsp-2 m-0"><b>GEN:</b>`+ generation +`</h4></span>
                <span class="badge badge-light mb-3">
                <h4 class="tsp-2 m-0"><b>DNA: </b>`+ dna +`</h4></span>
            `) 
            $('#hereBelow').css('display', 'none')
            $('#congrats').css('display', 'block')
    }   
    // renders the relevant catId in html into the catBreedBox for it to appear on the 
    // breeding.html and catDetails.html page
    function catBreedBox(id, onclick) {

      var catDiv = `<div class="col cat-container pointer" onclick="` + onclick + `" id="`+ id + `">
                  <div class="featureBox catDiv">
                  <div class="idDiv" id="catIdNumberNew"></div>
                      <div id="earsNew" class="cat__ear">
                          <div id="leftEarNew" class="cat__ear--left">
                              <div class="ear-whisker1left"></div>
                              <div class="ear-whisker2left"></div>
                              <div class="cat__ear--left-inside"></div>
                          </div>
                          <div id="rightEarNew" class="cat__ear--right">
                              <div class="ear-whisker1right"></div>
                              <div class="ear-whisker2right"></div>
                              <div class="cat__ear--right-inside"></div>
                          </div>   
                      </div>
                      <div id="headNew" class="cat__head">
                          <div class="cat__head-zoneBlur"></div>
                          <div id="midDotNew" class="cat__head-dots">
                              <div id="leftDotNew" class="cat__head-dots_first"></div>
                              <div id="rightDotNew" class="cat__head-dots_second"></div> 
                          </div>
  
                          <div class="cat__eye-left-zoneblur"></div>
                          <div class="cat__eye-right-zoneblur"></div>
  
                          <div class="cat__eye">
                              <div name="eye-leftNew" id="leftTwinkleNew" class="cat__eye--left"></div>
                              <div name="eye-rightNew" id="rightTwinkleNew" class="cat__eye--right"></div>
                          </div>
                          
                          <div id="pupL-offNew" class="pupil-left"></div>
                          <div id="refL-offNew" class="reflex-left"></div>
                          
                          <div id="pupR-offNew" class="pupil-right"></div>
                          <div id="refR-offNew" class="reflex-right"></div>
                          
                          
                          <div class="cat__nose"></div>
                          
  
                          <div class="cat__mouth-contour" id="mouth-contourNew">
  
                              <div class="mouth-container">
                                  <div id="MouthLimitNew" class="square">
  
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
                          <div class="cat__chest" id="chestNew"></div>
                          <div class="cat__chest_inner" id="chest_innerNew"></div>
  
                          <div id="cat__pawLNew" class="cat__paw-left">
                              <div class="cat__paw-shadowL">
                                  <div name="clawNew" class="claw claw_pl1"></div>
                                  <div name="clawNew" class="claw claw_pl2"></div>
                                  <div name="clawNew" class="claw claw_pl3"></div>
                              </div>
                          </div>
  
                          <div id="cat__stompLNew" class="cat__paw-left_inner">
                              <div id="clawsInnerLNew" class="cat__paw-shadowInnerL">
                                  <div name="clawsLNew" class="clawsL claws__left1"></div>
                                  <div name="clawsLNew" class="clawsL claws__left2"></div>
                                  <div name="clawsLNew" class="clawsL claws__left3"></div>
                              </div>
                          </div>
  
                          <div id="cat__pawRNew" class="cat__paw-right">
                              <div class="cat__paw-shadowR">
                                  <div name="clawNew" class="claw claw_pr1"></div>
                                  <div name="clawNew" class="claw claw_pr2"></div>
                                  <div name="clawNew" class="claw claw_pr3"></div>
                              </div>
                          </div>
                          
                          <div id="cat__stompRNew" class="cat__paw-right_inner">
                              <div id="clawsInnerRNew" class="cat__paw-shadowInnerR">
                                  <div name="clawsRNew" class="clawsR claws__right1"></div>
                                  <div name="clawsRNew" class="clawsR claws__right2"></div>
                                  <div name="clawsRNew" class="clawsR claws__right3"></div>
                              </div>
                          </div>
                              
                          <div id="tailNew" class="cat__tail">
                              <div class="tail__arrow">
                                  <div class="tail__whisker tail__whiskerLeft"></div>
                                  <div class="tail__whisker tail__whiskerRight"></div>
                              </div>
                          </div> <br><br><br><br><br>
                              <div class="dnaDiv" id="catDNANew"></div>
  
                          <ul class="ml-5 cattributes" id="listAlign">
                              <li><span id="eyeNameNew"></span> eyes</li>
                              <li><span id="decoNameNew"></span> decoration</li>
                              <li><span id="animationNameNew"></span> animation </li>
                          </ul>
                          
                      </div>
                  </div>
              </div>`
  
      $('#catsBreedDiv').html(catDiv)
  
  
  }