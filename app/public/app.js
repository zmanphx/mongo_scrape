$(document).ready(function() {
  // Grab the articles as a json

  $(document).on("click", "#btnscrape", function(event) {
    //user select which article to add note to.
    event.preventDefault();
    event.stopPropagation();

    $.ajax({
      method: "GET",
      url: "/"
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
      });
  });

// delete note

$(document).on("click", ".btndelnote", function(event) {
  //user select which article to add note to.
 
  event.preventDefault();
  event.stopPropagation();
  var id = $(this)
    .data("myval")
    .trim();
  
console.log("noteid", id);

$.ajax({
  method: "DELETE",
  url: "/" + id
})
  // With that done
  .then(function(data) {
    // Log the response
    console.log("Get Notes");
    console.log(data);
  });

});



  $(document).on("click", ".btnaddtitle", function(event) {
    //user select which article to add note to.
    window.location.href = "#toprow2";
    event.preventDefault();
    event.stopPropagation();
    var id = $(this)
      .data("myval")
      .trim();
    var title = $(this)
      .data("mytitle")
      .trim();

    $("#inputtitle:text").val(title);

    $("#savenote").data("mongoid", id);
  });

  $("#btnJSONART").on("click", function() {
    window.location = "/articles";
  });

  $("#btnJSONnote").on("click", function() {
    window.location = "/notes";
  });

  $("#savenote").unbind("click");
  $("#savenote").on("click", function() {
    // saving  the note to the article and creating note record in mongo
    event.preventDefault();
    event.stopPropagation();

    let mongoid = $("#savenote").data("mongoid");
    console.log("My mongoid", mongoid);
    $.ajax({
      method: "POST",
      url: "/" + mongoid,
      data: {
        // Value taken from title input
        id: mongoid,
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

    //************************Get the Notes */
    $.ajax({
      method: "GET",
      url: "/notes"
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log("Get Notes");
        console.log(data);
      });
  });

 
});
