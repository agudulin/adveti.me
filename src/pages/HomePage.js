import React, { Component } from "react";

import PageLayout from "../components/PageLayout";
import BmoVision from "../components/BmoVision";

class HomePage extends Component {
  render() {
    return (
      <PageLayout updatedDateTime="just now">
        <BmoVision />
      </PageLayout>
    );
  }

}

export default HomePage;
