import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import { RouteStore } from "fluxible-router";

import routes from "./routes";
import Application from "./Application";
import HtmlHeadStore from "./stores/HtmlHeadStore";
import ShowStore from "./stores/ShowStore";

// create the fluxible app using Application as root component
const app = new Fluxible({ component: Application });

// make fetchr services respond to /api endpoint
app.plug(fetchrPlugin({ xhrPath: "/api" }));

// register a fluxible RouteStore
const AppRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(AppRouteStore);

// XXX: app-specific stores here
app.registerStore(HtmlHeadStore);
app.registerStore(ShowStore);

export default app;
