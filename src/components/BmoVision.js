import React, { Component } from "react";

if (process.env.CLIENT) {
  require("../style/BmoVision.css");
}

class BmoVision extends Component {

  render() {
    return (
      <p className="BmoVision">
        <img src="/assets/bmo-vision.jpg" />
      </p>
    );
  }

}

export default BmoVision;
