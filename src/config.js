// different configs for prod or dev
let configFile = "dev.js";

if (process.env.NODE_ENV === "production") {
  configFile = "prod.js";
}

const config = require("../conf/" + configFile);

export default config;
