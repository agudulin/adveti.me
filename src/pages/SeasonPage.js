import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible/addons";

import EpisodeList from "../components/EpisodeList";

class SeasonPage extends Component {
  static propTypes = {
    episodes: PropTypes.array.isRequired
  }

  render() {
    const { episodes } = this.props;

    return (
      <EpisodeList episodes={episodes} />
    );
  }

}

SeasonPage = connectToStores(SeasonPage, ["ShowStore"],
  (stores) => ({
    episodes: stores.ShowStore.getEpisodes()
  })
);

export default SeasonPage;
