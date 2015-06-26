import mongoose from "mongoose";
import { db } from "../config";

function init() {
  mongoose.connect(`mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`);
}

export default {
  init: init
};
