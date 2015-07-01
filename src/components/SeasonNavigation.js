import React, { Component, PropTypes } from "react";
import { NavLink } from "fluxible-router";

if (process.env.CLIENT) {
  require("../style/SeasonNavigation.css");
}

class SeasonNavigation extends Component {
  static propTypes = {
    seasons: PropTypes.array.isRequired
  }

  render() {
    const { seasons } = this.props;

    return (
      <ul className="SeasonNavigation">
        { seasons.map((season, idx) => (
            <li key={idx}>
              <NavLink href={`/season/${season}`} className="SeasonNavigation__btn" activeClass="SeasonNavigation__btn--active">
                {`Season ${season}`}
              </NavLink>
            </li>
          ))
        }
      </ul>
    );
  }

}

export default SeasonNavigation;
