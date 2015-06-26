var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  name: String,
  url: String
});

var EpisodeSchema = new Schema({
  season: Number,
  name: String,
  url: String,
  videos: [VideoSchema]
});

var ShowSchema = new Schema({
  name: String,
  episodes: [EpisodeSchema],
  updated: String
});

module.exports = mongoose.model("Show", ShowSchema);
