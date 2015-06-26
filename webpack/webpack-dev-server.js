var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("./dev.config");

var WEBPACK_HOST = process.env.HOST || "localhost";
var WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;
var serverOptions = {
  contentBase: "http://" + WEBPACK_HOST + ":" + WEBPACK_PORT,
  quiet: true,
  noInfo: true,
  hot: true,
  lazy: false,
  publicPath: config.output.publicPath,
  // headers: { "Access-Control-Allow-Origin": "*" },
  stats: { colors: true }
};

var compiler = webpack(config);
var webpackDevServer = new WebpackDevServer(compiler, serverOptions);

webpackDevServer.listen(WEBPACK_PORT, WEBPACK_HOST, function() {
  console.log("Webpack development server listening on %s:%s", WEBPACK_HOST, WEBPACK_PORT);
});
