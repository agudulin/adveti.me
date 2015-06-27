import React, { Component, PropTypes } from "react";

import EpisodeList from "../components/EpisodeList";

class SeasonPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  render() {
    const episodes = this.context.getStore("ShowStore").getEpisodes();

    return (
      <EpisodeList episodes={episodes} />
    );
  }

}

export default SeasonPage;
