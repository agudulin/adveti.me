import React, { PropTypes, Component } from "react";
import { provideContext, connectToStores } from "fluxible/addons";
import { handleHistory } from "fluxible-router";

import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";

// if (process.env.BROWSER) {
//   require("./style/Application.scss");
// }

class Application extends Component {

  static propTypes = {

    // props coming from fluxible-router's handleHistory
    isNavigateComplete: PropTypes.bool,
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    }),
    // prop coming from HtmlHeadStore
    documentTitle: PropTypes.string
  }

  componentDidUpdate(prevProps) {
    const { documentTitle, currentRoute } = this.props;

    if (prevProps.documentTitle !== documentTitle) {
      document.title = documentTitle;
    }
  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete } = this.props;

    let Handler = currentRoute && currentRoute.get("handler");

    let content;

    if (currentNavigateError && currentNavigateError.statusCode === 404) {
      content = <NotFoundPage />;
    }
    else if (currentNavigateError) {
      content = <ErrorPage err={currentNavigateError} />;
    }
    else if (!Handler) {
      content = <NotFoundPage />;
    }
    else if (!isNavigateComplete) {
      content = <LoadingPage />;
    }
    else {
      // Here you go with the actual page content
      const params = currentRoute.get("params").toJS();
      content = <Handler {...params} />;
    }
    return content;
  }

}

Application = connectToStores(Application, ["HtmlHeadStore"],
  (stores) => ({
    documentTitle: stores.HtmlHeadStore.getTitle()
  })
);

// wrap with fluxible-router's history handler (required for routing)
// it also pass `currentRoute` as prop to the component
Application = handleHistory(Application);
Application = provideContext(Application);

export default Application;
