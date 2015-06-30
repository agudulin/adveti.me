import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  role: String,
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  }
});

export default mongoose.model("User", UserSchema);
