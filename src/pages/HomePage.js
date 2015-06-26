import React, { Component } from "react";

import PageLayout from "../components/PageLayout";
import SeasonNavigation from "../components/SeasonNavigation";

if (process.env.CLIENT) {
  require("../style/HomePage.css");
}

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
        <div className="HomePage">
          <aside className="HomePage__aside">
            <SeasonNavigation seasons={this.state.seasons} />
          </aside>

          <article className="HomePage__article">
            content
          </article>
        </div>
      </PageLayout>
    );
  }

}

export default HomePage;
