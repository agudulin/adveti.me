import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import favicon from "serve-favicon";
import morgan from "morgan";
import csurf from "csurf";
import app from "./app";
import render from "./server/render";

const server = express();

server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
// server.use(favicon(path.resolve(__dirname, "./assets/favicon.png")));

server.use(csurf({ cookie: true }));

if (server.get("env") === "production") {
  server.use(require("serve-static")(path.join(__dirname, "..", "public")));
} else {
  server.use("/assets", express.static(path.resolve(__dirname, "./assets")));
}

// configure fetchr (for doing api calls server and client-side) and register its services
const fetchr = app.getPlugin("FetchrPlugin");
fetchr.registerService(require("./services/show"));
// use the fetchr middleware (will enable requests from /api)
server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

server.use(render);

server.use((err, req, res) => {
  console.log("Error on request %s %s", req.method, req.url);
  console.log(err);
  console.log(err.stack);
  res.status(500).send("Something bad happened");
});

server.set("port", process.env.PORT || 3000);

server.listen(server.get("port"), () => {
  console.log(`Express ${server.get("env")} server listening on ${server.get("port")}`);
});
