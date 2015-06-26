import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible/addons";

import PageLayout from "../components/PageLayout";
import EpisodeList from "../components/EpisodeList";

// if (process.env.CLIENT) {
//   require("../style/SeasonPage.css");
// }

class SeasonPage extends Component {
  static propTypes = {
    season: PropTypes.string.isRequired,
    episodes: PropTypes.array.isRequired
  }

  render() {
    const { season, episodes } = this.props;

    return (
      <PageLayout updatedDateTime="just now">
        <EpisodeList episodes={episodes} />
      </PageLayout>
    );
  }

}

SeasonPage = connectToStores(SeasonPage, ["ShowStore"],
  (stores) => ({
    season: stores.ShowStore.getCurrentSeason(),
    episodes: stores.ShowStore.getEpisodes()
  })
);

export default SeasonPage;
