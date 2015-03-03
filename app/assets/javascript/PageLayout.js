var React = require('react');
var Router = require('react-router');
var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link,
    RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <header className="header"><Link to={this.props.headerRoute}>Adventure Time</Link></header>

        {/* Main content */}
        {this.props.children}

        <footer className="footer">
          <p>:3</p>
          <p>Made with all the love in the world to Sveta by <a href="https://twitter.com/agudulin">@agudulin</a>.</p>
        </footer>
      </div>
    );
  }
});