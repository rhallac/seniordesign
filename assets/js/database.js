// An example Parse.js Backbone application based on the todo app by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses Parse to persist
// the todo items and provide user authentication and sessions.

$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("zr8wZzkOi6PwdixtE8F1W1S1nbKFLb6Sct4RWSAJ",
                   "i9npZOagnA3rs0QqW0MCUFdXZfNYsOgH30Vt20qK");

  // Gallery Model
  // ----------

  var Galleries = new Parse.Object("Gallery");
  var Exhibits = new Parse.Object("Exhibit");

  var query = new Parse.Query(Exhibits);
  query.find({
  success: function(results) {
    // results is an array of Parse.Object.
    for (i = 0; i <results.length; i++){
      $('.searchResults').append( "<div class='row searchResult'>"+
            "<h4 class='searchResultTitle'>" + results[i].attributes.title + "</h4>"+
            "<h5 class='searchResultGallery'>" + results[i].attributes.galleryName + "</h5>" +
            "<p class='searchResultDescription'>" + results[i].attributes.description + "<br></p>" +
            "<div class='row'>"+
                "<div class='col-md-8'>"+
                    "<p class='searchResultEnter'><a href='" + results[i].attributes.link+ "'>&gt;&gt; Enter Gallery </a></p>"+
                "</div>"+
                "<div class='col-md-4'>"+
                    "<p class='searchResultDate'>"+results[i].attributes.date.toLocaleDateString() +"</p>"+                                      
                "</div>"+
            "</div>"+
        "</div>    ");
      console.log(results[i].attributes);
    }
  },

  error: function(error) {
    console.log(error);
    // error is an instance of Parse.Error.
  }
  });

var wage = document.getElementById("searchText");
wage.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        searchTitles();
        return true;
    }
});

function showPopup(link) {
  alert(link);
}

function searchTitles() {
    $('.searchResults').empty();
  var query = new Parse.Query(Exhibits);
  query.contains("title", document.getElementById('searchText').value);
  query.find({
  success: function(results) {
    // results is an array of Parse.Object.
    for (i = 0; i <results.length; i++){
      $('.searchResults').append( "<div class='row searchResult'>"+
            "<h4 class='searchResultTitle'>" + results[i].attributes.title + "</h4>"+
            "<h5 class='searchResultGallery'>" + results[i].attributes.gallery.title + "</h5>" +
            "<p class='searchResultDescription'>" + results[i].attributes.description + "<br></p>" +
            "<div class='row'>"+
                "<div class='col-md-8'>"+
                '<input type="button" onClick="showPopup(\'' + results[i].attributes.link + '\')" />' +
                "<p class='searchResultEnter'><a href='" + results[i].attributes.link+ "'>&gt;&gt; Enter Gallery </a></p>"+
                "</div>"+
                "<div class='col-md-4'>"+
                    "<p class='searchResultDate'>"+results[i].attributes.date.toLocaleDateString() +"</p>"+                                      
                "</div>"+
            "</div>"+
        "</div>    ");

    //  console.log(results[i].attributes);
    }
  },

  error: function(error) {
    console.log(error);
    // error is an instance of Parse.Error.
  }
});
}





$( "#dothesearch" ).click(function() {
  $('.searchResults').empty();
  var query = new Parse.Query(Exhibits);
  query.contains("title", document.getElementById('searchText').value);
  query.find({
  success: function(results) {
    // results is an array of Parse.Object.
    for (i = 0; i <results.length; i++){
      $('.searchResults').append( "<div class='row searchResult'>"+
            "<h4 class='searchResultTitle'>" + results[i].attributes.title + "</h4>"+
            "<h5 class='searchResultGallery'>" + results[i].attributes.gallery.title + "</h5>" +
            "<p class='searchResultDescription'>" + results[i].attributes.description + "<br></p>" +
            "<div class='row'>"+
                "<div class='col-md-8'>"+
                    "<p class='searchResultEnter'><a href='" + results[i].attributes.link+ "'>&gt;&gt; Enter Gallery </a></p>"+
                "</div>"+
                "<div class='col-md-4'>"+
                    "<p class='searchResultDate'>"+results[i].attributes.date.toLocaleDateString() +"</p>"+                                      
                "</div>"+
            "</div>"+
        "</div>    ");
     // console.log(results[i].attributes);
    }
  },

  error: function(error) {
    console.log(error);
    // error is an instance of Parse.Error.
  }
});


});


// $('#searchText').keypress(function(event) { 
//   if (event.keyCode == 13) {
//   console.log("sdfasdf");
//   }
//     return event.keyCode != 13;
// }); 

});



