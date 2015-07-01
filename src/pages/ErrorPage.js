import React, { Component, PropTypes } from "react";

class ErrorPage extends Component {
  static propTypes = {
    err: PropTypes.object.isRequired
  }

  render() {
    const { err } = this.props;

    return (
      <div>
        Error: {err}.
      </div>
    );
  }

}

export default ErrorPage;
