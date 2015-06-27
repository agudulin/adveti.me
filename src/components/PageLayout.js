import React, { Component, PropTypes } from "react";
import { NavLink } from "fluxible-router";

import SeasonNavigation from "../components/SeasonNavigation";
import Loading from "../components/Loading";

if (process.env.CLIENT) {
  require("../style/PageLayout.css");
}

class PageLayout extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      seasons: [1, 2, 3, 4, 5, 6]
    };
  }

  render() {
    const { isLoading } = this.props;
    const updatedDateTime = this.context.getStore("ShowStore").getUpdatedDateTime();

    return (
      <div className="PageLayout">
        <header className="PageLayout__header"><NavLink href="/">Adventure Time</NavLink></header>

        <div className="PageLayout__content">
          <aside className="PageLayout__aside">
            <SeasonNavigation seasons={this.state.seasons} />
          </aside>

          <article className="PageLayout__article">
            { isLoading ? <Loading /> : ""}
            {this.props.children}
          </article>
        </div>

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
