import React from "react";
import es6Promise from "es6-promise";
import app from "./app";

window.debug = require("debug");
const debug = window.debug("advetime");

const mountNode = document.getElementById("root");
const dehydratedState = window.App;

// promise support for browser not supporting it
es6Promise.polyfill();

debug("Rehydrating state...", dehydratedState);
app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }

  debug("State has been rehydrated");

  const Application = app.getComponent();

  React.render(<Application context={context.getComponentContext()} />, mountNode, () => {
    debug("Application has been mounted");
  });
});
