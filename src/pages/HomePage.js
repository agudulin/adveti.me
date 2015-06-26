import React, { Component } from "react";

import PageLayout from "../components/PageLayout";
import SeasonNavigation from "../components/SeasonNavigation";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: [1, 2, 3, 4, 5, 6]
    };
  }

  render() {
    return (
      <PageLayout updatedDateTime="just now">
        <aside>
          <SeasonNavigation seasons={this.state.seasons} />
        </aside>

        <article>
          content
        </article>
      </PageLayout>
    );
  }

}

export default HomePage;
