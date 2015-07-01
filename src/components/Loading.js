import React, { Component } from "react";

if (process.env.CLIENT) {
  require("../style/Loading.css");
}

class Loading extends Component {

  render() {
    return (
      <div className="Loading">
        <div className="Loading__spinner"></div>
      </div>
    );
  }

}

export default Loading;
