// female by default is "false"
  var gender = false;
    $(document).ready(
      setTimeout(() => {
        var callback = "selectCat(this.id)"
          getCats(callback)
      }, 1000)
      )
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