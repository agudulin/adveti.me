var React = require('react');
var Router = require('react-router');
var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler;

var MainPageComponent = require('./MainPage');
var MainPage = MainPageComponent.MainPage,
    Season = MainPageComponent.Season,
    BmoVision = MainPageComponent.BmoVision;

var App = React.createClass({
  render: function() {
    return (
      <RouteHandler />
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name="main" path="/" handler={MainPage}>
      <Route name="season" path="season/:season" handler={Season}/>
      <DefaultRoute handler={BmoVision}/>
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
