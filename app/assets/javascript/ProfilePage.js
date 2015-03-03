var React = require('react');
var Router = require('react-router');
var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link,
    RouteHandler = Router.RouteHandler;
var Loader = require('react-loader');

var PageLayout = require('./PageLayout');

var ProfilePage = React.createClass({
  render: function() {
    return (
      <PageLayout headerRoute="profile">
        <RouteHandler />
      </PageLayout>
    );
  }
});

var SignedIn = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Signed In</h2>
        <RouteHandler />
      </div>
    );
  }
});

var Home = React.createClass({
  render: function () {
    return (
      <article className="user-profile">
        <a href="/logout">Logout</a>
        <h1>user.twitter.displayName</h1>

        <p>
          <strong>Role</strong>: user.role<br />
          <strong>Id</strong>: user.twitter.id<br />
          <strong>Token</strong>: user.twitter.token<br />
          <strong>Username</strong>: user.twitter.username
        </p>

        <form action="/api/grab" method="post">
          <input type="number" name="season" value="6" />
          <input type="hidden" name="show_id" value="53e552117425f53b64000003" />

          <button type="submit">Update</button>
        </form>
      </article>
    );
  }
});

var SignedOut = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Signed Out</h2>
        <Link to="signin">Sign in</Link>
        <RouteHandler/>
      </div>
    );
  }
});

var SignIn = React.createClass({
  render: function () {
    return (
      <div>
        <a href="/login">Login via twitter</a>
      </div>
    );
  }
});

module.exports = {
  ProfilePage: ProfilePage,
  SignedIn: SignedIn,
  ProfileHome: Home,
  SignedOut: SignedOut,
  SignIn: SignIn
}
