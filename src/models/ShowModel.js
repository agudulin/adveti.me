import mongoose from "mongoose";
const Schema = mongoose.Schema;

let VideoSchema = new Schema({
  name: String,
  url: String
});

let EpisodeSchema = new Schema({
  season: Number,
  name: String,
  url: String,
  videos: [VideoSchema]
});

let ShowSchema = new Schema({
  name: String,
  episodes: [EpisodeSchema],
  updated: String
});

export default mongoose.model("Show", ShowSchema);
