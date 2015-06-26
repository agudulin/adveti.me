require("babel/register")({
  stage: 0,
  plugins: ["typecheck"]
});

// Define universal constants
delete global.__BROWSER__;

if (process.env.NODE_ENV !== "production") {
  if (!require("piping")({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.css$)/i
    })) {
    require("./src/server");
  }
}
