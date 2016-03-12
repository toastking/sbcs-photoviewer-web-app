//use the shorthand for document ready
$(function(){
  console.log("document loaded!");

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"];
  var months  = ["January", "February", "March", "April", "May","June","July","August","September","October","November","December"];

  var slideImage = $("#slide"); //get the image
  var greeting = $("#greeting");
  var dateText = $("#date");
  var date = new Date();

  //change the greeting based on the time of day
  var time = date.getHours();
  var dayOfWeek = days[date.getDay()];
  var month = months[date.getMonth()];
  var dayNumber = date.getDate();
  var year = date.getFullYear();

  dateText.text(dayOfWeek + " " + month + " " + dayNumber + ", " + year);

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
        complete: setTimeout(poll, 10000),
        timeout: 2000
      });
})();
//make the ajax request to the server to get the image urls
var pollingInterval = 1000 * 60 * 10;
(function run(){
  //poll for data with a 6 second timout
    $.ajax({
        url:"/update",
        type:"GET",
        dataType:"text",
        success: function(data){
          console.log(data);
        },error: function(error) {
            console.log(error);
        }
        ,
        complete: setTimeout(run, pollingInterval),
        timeout: 2000
      });
})();

});
