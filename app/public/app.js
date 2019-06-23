$(document).ready(function() {
  // Grab the articles as a json
  


  $(document).on("click", "#btnscrape", function(event) {
    //user select which article to add note to.
    event.preventDefault();
    event.stopPropagation();
   
    $.ajax({
      method: "GET",
      url: "/",
     
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
       
      });
   
   
   
  });


  $(document).on("click", ".btnaddtitle", function(event) {
    //user select which article to add note to.
    event.preventDefault();
    event.stopPropagation();
    var id = $(this)
      .data("myval")
      .trim();
    var title = $(this)
      .data("mytitle")
      .trim();

    $("#inputtitle:text")
      .val(title);
      
    $("#savenote").data("data-mongoid", id);
  });

  $( "#savenote" ).unbind( "click" );
  $("#savenote").on("click", function() {
    // saving  the note to the article and creating note record in mongo
    event.preventDefault();
    event.stopPropagation();
     console.log("saved button ");
 
    let mongoid = $(this).data("mongoid");
     console.log(mongoid);
    $.ajax({
      method: "POST",
      url: "/" + mongoid,
      data: {
        // Value taken from title input
        title: $("#inputtitle").val(),
        // Value taken from note textarea
        body: $("#inputnote").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#inputnote").empty();
      });
     
      $("#inputtitle").val("");
      $("#inputnote").val("");


  });

  // When you click the savenote button
  /* $(document).on("click", "#2savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  }); */
});
