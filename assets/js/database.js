window.onload = function() {
    var s = Snap("#workspace");
    var map = Snap.load("svgs/Map1v5.svg", function(loadedFragment) {
        s.add(loadedFragment);
        //zoom
        document.getElementById('UPennMap').setAttribute("style", "width:100%");
        //   document.getElementById('UPennMap').setAttribute("style","height:100%");
        window.zoomMap = svgPanZoom('#UPennMap', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: true,
            center: true,
        });

        zoomMap.zoom(3)


        //Database 

        $(function() {

            Parse.$ = jQuery;

            // Initialize Parse with your Parse application javascript keys
            Parse.initialize("zr8wZzkOi6PwdixtE8F1W1S1nbKFLb6Sct4RWSAJ",
                "i9npZOagnA3rs0QqW0MCUFdXZfNYsOgH30Vt20qK");


            //parse Objects
            var Galleries = new Parse.Object("Gallery");
            var Exhibits = new Parse.Object("Exhibit");




            var wage = document.getElementById("searchText");
            wage.addEventListener("keydown", function(e) {
                if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
                    searchTitles();
                    return true;
                }
            });

            function createResults(results) {
                // results is an array of Parse.Object.
                for (i = 0; i < results.length; i++) {
                    $('.searchResults').append("<div class='row searchResult'>" +
                        "<h4 class='searchResultTitle'>" + results[i].attributes.title + "</h4>" +
                        "<h5 class='searchResultGallery'>" + results[i].attributes.galleryName + "</h5>" +
                        "<p class='searchResultDescription'>" + results[i].attributes.description + "<br></p>" +
                        "<div class='row'>" +
                        "<div class='col-md-8'>" +
                        '<a class="searchResultEnter" onClick="showPopup(\'' + results[i].attributes.link + '\')" >&gt;&gt; Enter Gallery</a>' +
                        "</div>" +
                        "<div class='col-md-4'>" +
                        "<p class='searchResultDate'>" + results[i].attributes.date.toLocaleDateString() + "</p>" +
                        "</div>" +
                        "</div>" +
                        "</div>    ");

                    //  console.log(results[i].attributes);
                }
            }

            function searchTitles() {
                $('.searchResults').empty();
                var query = new Parse.Query(Exhibits);
                query.contains("title", document.getElementById('searchText').value);
                query.find({
                    success: function(results) {
                        createResults(results);
                    },

                    error: function(error) {
                        console.log(error);
                        // error is an instance of Parse.Error.
                    }
                });
            }

            function searchObjectId(objectId) {
              $('.searchResults').empty();
              var query = new Parse.Query(Exhibits);
              query.equalTo("gallery", {
                  __type: "Pointer",
                  className: "Gallery",
                  objectId: objectId
              });

              query.find({
                    success: function(results) {
                        createResults(results);
                    },

                    error: function(error) {
                        console.log(error);
                        // error is an instance of Parse.Error.
                    }
                });           
            }




            $("#dothesearch").click(function() {
                $('.searchResults').empty();
                var query = new Parse.Query(Exhibits);
                query.contains("title", document.getElementById('searchText').value);
                query.find({
                    success: function(results) {
                        createResults(results);
                    },

                    error: function(error) {
                        console.log(error);
                        // error is an instance of Parse.Error.
                    }
                });


            });

            //SVG interactions with database

            var gr = s.select("g");
            var galleries = s.select("#Galleries").attr({
                fill: "#fff"
            });
            var everything = s.select("#EverythingElse");

            var ICA = galleries.select(".iJssWPxJI6");
            var cohen = galleries.select(".cPjPWpDBrn");

            var list = galleries.selectAll(".gallery");

            console.log(list);

            list.forEach(function(el) {
                
                console.log(el);
                el.node.onclick = function() {
                    searchObjectId(el.node.attributes.id.value);
                };

            });

                      // $('#searchText').keypress(function(event) { 
            //   if (event.keyCode == 13) {
            //   console.log("sdfasdf");
            //   }
            //     return event.keyCode != 13;
            // }); 

        });




        //set size of popup overlay stuff of image stuff 
        $('#overlay').css({
            width: $('#workspace').width()
        });
        $('#overlay').css({
            height: $('#UPennMap').height() + 8
        });
        $('#overlay').css({
            bottom: $('#UPennMap').height() + 8
        });

        $('#overlay').css({
            "margin-bottom": -$('#UPennMap').height() - 8
        });

        //search scroll
        $('.searchColumn').css({
            height: $('#UPennMap').height()
        });




    });
};

// Show Popup 
function showPopup(link) {
    // console.log($('.galleryPopUp').src);
    // document.getElementsByClassName('galleryPopUp').src = link;
    //  console.log(document.getElementsByClassName('galleryPopUp').src);
    $('.overlay').empty(); //(".galleryPopUp");
    //console.log($('.overlay'));

    $(".overlay").append("<iframe class='galleryPopUp' id = 'galleryPopUp' width='100%' height='100%' src='" + link + "' frameborder='0' allow-fullscreen></iframe>");
    $(".overlay").append(' <button type="button" class="btn btn-default pull-right leaveGalleryButton" onclick="nextGallery();">Next Gallery</button>');
    $(".overlay").append(' <button type="button" class="btn btn-default pull-right leaveGalleryButton" onclick="hidePopup();">Exit Gallery</button>');

    $('.overlay').css({
        visibility: 'visible'
    });
    //document.getElementsByClassName('galleryPopUp').contentWindow.reload();
    // document.getElementById('overlay').src = document.getElementById('overlay').src
}

function hidePopup() {
    // alert("load");
    $('.overlay').css({
        visibility: 'hidden'
    });


}

function nextGallery() {
    // alert("load");

    document.getElementById('searchText').value = "Meeting"
    $('.searchResults').empty();
   $('.searchResults').append("<div class='row searchResult'>" +
                        "<h4 class='searchResultTitle'>Meeting</h4>" +
                        "<h5 class='searchResultGallery'>SIG Lab</h5>" +
                        "<p class='searchResultDescription'>Where staff meeting occurs<br></p>" +
                        "<div class='row'>" +
                        "<div class='col-md-8'>" +
                        '<a class="searchResultEnter" onClick="showPopup(\'\')" >&gt;&gt; Enter Gallery</a>' +
                        "</div>" +
                        "<div class='col-md-4'>" +
                        "<p class='searchResultDate'>4/28/2016</p>" +
                        "</div>" +
                        "</div>" +
                        "</div>    ");

                    //  console.log(results[i].attributes);
                

}
