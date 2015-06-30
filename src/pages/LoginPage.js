import React, { Component } from "react";

if (process.env.CLIENT) {
  require("../style/LoginPage.css");
}

class LoginPage extends Component {

  render() {
    return (
      <div className="LoginPage">
        <a className="LoginPage__login" href="/login">Login</a>
      </div>
    );
  }

}

export default LoginPage;
