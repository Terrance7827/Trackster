var Trackster = {};
const API_KEY = 'bcd3d4a28e808932a8c7dcf276483c9e';
$(document).ready(function(){

  $('#search-btn').click(function(){
    Trackster.searchTracksByTitle($('#search-bar').val());
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $('#results').empty();
  for(var i = 0; i < tracks.length; i++){
    var track = tracks[i];
    var artwork = track.image[1]["#text"];
    var element = "<div class='row track'>"+
    "<div class='play-button col-sm-1 col-sm-offset-1'><a href="+track.url+" target='_blank'><i class='fas fa-play-circle'>"+
    "</i></a></div><div class='col-sm-4 col'>"+track.name+"</div><div class='col-sm-2'>"+track.artist+"</div>"+
    "<div class='col-sm-2'><img src="+artwork+"></div><div class='col-sm-2'>"+track.listeners+"</div></div>";
    $('#results').append(element);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" +title+ "&api_key=" +API_KEY+ "&format=json",
    success: function(response){
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};
