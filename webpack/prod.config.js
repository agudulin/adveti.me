// Webpack config for creating the production bundle.

var autoprefixer = require("autoprefixer-core");
var csswring = require("csswring");
var postcssNested = require("postcss-nested");
var path = require("path");
var webpack = require("webpack");
var writeStats = require("./utils/write-stats");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var strip = require("strip-loader");

var assetsPath = path.join(__dirname, "../public/assets");

module.exports = {
  devtool: "source-map",
  context: path.resolve(__dirname, ".."),
  entry: {
    "main": "./src/client.js"
  },
  output: {
    path: assetsPath,
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      { test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader("debug"), "babel?stage=0&optional=runtime&plugins=typecheck"]},
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss") }
    ]
  },
  progress: true,
  postcss: [autoprefixer, csswring, postcssNested],
  resolve: {
    modulesDirectories: [
      "src",
      "node_modules"
    ],
    extensions: ["", ".json", ".js"]
  },
  plugins: [

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin("[name]-[chunkhash].css"),
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
      "process.env": {

        // Mainly used to require CSS files with webpack, which can happen only on browser
        // Used as `if (process.env.CLIENT)...`
        CLIENT: JSON.stringify(true),

        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify("production")

      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
        }
    }),

    // stats
    function() { this.plugin("done", writeStats); }

  ]
};
