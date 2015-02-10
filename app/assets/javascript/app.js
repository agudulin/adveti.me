var React = require('react');
var Router = require('react-router');
var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler;

var ProfilePageComponent = require('./ProfilePage');
var ProfilePage = ProfilePageComponent.ProfilePage,
    SignedIn = ProfilePageComponent.SignedIn,
    ProfileHome = ProfilePageComponent.ProfileHome,
    SignedOut = ProfilePageComponent.SignedOut,
    SignIn = ProfilePageComponent.SignIn;
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
    <Route name="profile" path="/profile" handler={ProfilePage}>
      <Route handler={SignedOut}>
        <Route name="signin" handler={SignIn}/>
      </Route>
      <Route handler={SignedIn}>
        <Route name="home" handler={ProfileHome}/>
      </Route>
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
