$(function(){
  var AT_SHOW_ID = "53e552117425f53b64000003";

  var cachedSeasonEpisodesMap = {};
  var $seasonButton = $(".btn[data-season]");

  $seasonButton.on("click", function(){
    var selectedSeason = $(this).data("season");
    var AT_EPISODES_PER_SEASON = "/api/show/" + AT_SHOW_ID + "/" + selectedSeason + "/episodes";
    if (cachedSeasonEpisodesMap[selectedSeason] === undefined) {
      $.ajax(AT_EPISODES_PER_SEASON)
        .done(function(data){
          cachedSeasonEpisodesMap[selectedSeason] = data;
          addEpisodesToViewport(data);
        })
        .fail(function(){
          console.log("fail");
        })
        .always(function(){
          console.log("done");
        });
    } else {
      addEpisodesToViewport(cachedSeasonEpisodesMap[selectedSeason]);
    }
  });

  var addEpisodesToViewport = function(data) {
    var $episodesNavbar = $(".episodes-navbar");
    $episodesNavbar.empty();

    data.forEach(function(episode){
      var $episode = $("<li>");
      $episode.text(episode.name);
      episode.videos.forEach(function(video){
        $episode.append($("<a>").attr("href", video.url).text(video.name))
      });

      $episodesNavbar.append($episode);
    });
  }
});
