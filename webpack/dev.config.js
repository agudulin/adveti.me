var path = require("path");
var webpack = require("webpack");
var writeStats = require("./utils/write-stats");
var notifyStats = require("./utils/notify-stats");

var assetsPath = path.resolve(__dirname, "..", "/public/assets");

var WEBPACK_HOST = "localhost";
var WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

module.exports = {
  devtool: "eval-source-map",
  context: path.resolve(__dirname, ".."),
  entry: {
    "main": [
      "webpack-dev-server/client?http://" + WEBPACK_HOST + ":" + WEBPACK_PORT,
      "webpack/hot/only-dev-server",
      "./src/client.js"
    ]
  },
  output: {
    path: assetsPath,
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "http://" + WEBPACK_HOST + ":" + WEBPACK_PORT + "/assets/"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?stage=0&optional=runtime&plugins=typecheck"] }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      "src",
      "node_modules"
    ],
    extensions: ["", ".json", ".js"]
  },
  plugins: [

    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        __CLIENT__: JSON.stringify(true),
        __SERVER__: JSON.stringify(false)
      }
    }),

    // stats
    function () {
      this.plugin("done", notifyStats);
    },
    function () {
      this.plugin("done", writeStats);
    }

  ]
};
