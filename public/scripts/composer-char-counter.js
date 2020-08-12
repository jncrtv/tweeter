$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {
    
    let numCharLeft = 140 - this.value.length;

    $(this).siblings("div").children(".counter").text(numCharLeft);
    
    if (numCharLeft >= 0) {
      
      $(this).siblings("div").children(".counter").css("color", "#545149");
      
    } else {
      
      $(this).siblings("div").children(".counter").css("color", "red");
      
    }
  })


});



