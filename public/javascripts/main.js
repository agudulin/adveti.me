$(function(){
  var AT_SHOW_ID = "53e552117425f53b64000003";

  var cachedSeasonEpisodesMap = {};
  var $seasonButton = $(".btn[data-season]");
  var $bmoVisionImgBlock = $(".bmo-vision");
  var $loadingSpinner = $(".loading");

  $seasonButton.on("click", function() {
    // mark season button active
    $seasonButton.removeClass("active");
    $(this).addClass("active");
    // hide BMO-vision image because we want to show a list of episodes at this place
    $bmoVisionImgBlock.hide();

    var selectedSeason = $(this).data("season");
    if (cachedSeasonEpisodesMap[selectedSeason] === undefined) {
      // start loading animation
      $loadingSpinner.show();

      var AT_EPISODES_PER_SEASON = "/api/show/" + AT_SHOW_ID + "/" + selectedSeason + "/episodes";
      $.ajax(AT_EPISODES_PER_SEASON)
        .done(function(data){
          cachedSeasonEpisodesMap[selectedSeason] = data;
          addEpisodesToViewport(data);
        })
        .fail(function(){
          console.log("fail");
        })
        .always(function(){
          // stop loading animation
          $loadingSpinner.hide();
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
      var $episodeName = $("<span>");
      var $episodeLinks = $("<div>");
      $episodeName
        .addClass("episode-name")
        .text(episode.name);
      $episodeLinks
        .addClass("episode-links");
      episode.videos.forEach(function(video, idx) {
        $link = $("<a>");
        $link
          .addClass("episode-video-link")
          .attr("href", video.url)
          .text(video.name);
        $episodeLinks.append($link);
      });

      $episode
        .append($episodeName)
        .append($episodeLinks);
      $episodesNavbar.append($episode);
    });
  }
});
