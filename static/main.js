//use the shorthand for document ready
$(function(){
  console.log("document loaded!");

  var slideImage = $("#slide"); //get the image
  var greeting = $("#greeting");
  var date = new Date();

  //change the greeting based on the time of day
  var time = date.getHours();

  if(time >0 && time <=12){
    greeting.text("Good Morning ");
  }else if(time >12 && time < 17){
    greeting.text("Good Afternoon ");
  }else{
    greeting.text("Good Evening ");
  }

//make the ajax request to the server to get the image urls
(function poll(){
  //poll for data with a 6 second timout
    $.ajax({
        url:"/image",
        type:"GET",
        dataType:"text",
        success: function(data){
          console.log(data);
          slideImage.attr("src",data);
        },error: function(error) {
            console.log(error);
        }
        ,
        complete: setTimeout(poll, 6000),
        timeout: 2000
      });
})();
});
