//use the shorthand for document ready
$(function(){
  console.log("document loaded!");

  var slideImage = $("#slide"); //get the image

  //make the ajax request to the server to get the image urls
  //TODO: make it poll for data
  $.ajax({
    url:"/image",
    type:"GET",
    dataType:"text",
    success: function(text){
      console.log(text);
      slideImage.attr("src",text);
    }
  });
});
