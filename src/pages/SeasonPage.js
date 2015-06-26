import React, { Component, PropTypes } from "react";

import PageLayout from "../components/PageLayout";
import EpisodeList from "../components/EpisodeList";

class SeasonPage extends Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  render() {
    const episodes = this.context.getStore("ShowStore").getEpisodes();

    return (
      <PageLayout updatedDateTime="just now">
        <EpisodeList episodes={episodes} />
      </PageLayout>
    );
  }

}

export default SeasonPage;
