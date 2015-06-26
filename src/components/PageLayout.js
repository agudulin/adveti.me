import React, { Component, PropTypes } from "react";
import { NavLink } from "fluxible-router";

if (process.env.CLIENT) {
  require("../style/PageLayout.css");
}

class PageLayout extends Component {
  static propTypes = {
    updatedDateTime: PropTypes.string.isRequired
  }

  render() {
    const { updatedDateTime } = this.props;

    return (
      <div className="PageLayout">
        <header className="PageLayout__header"><NavLink href="/">Adventure Time</NavLink></header>

        {this.props.children}

        <footer className="PageLayout__footer">
          <p>:3</p>
          <p>Made with all the love in the world to Sveta by <a href="https://twitter.com/agudulin">@agudulin</a>.</p>
          <div className="updated-datetime">Updated: {updatedDateTime}</div>
        </footer>
      </div>
    );
  }

}

export default PageLayout;
