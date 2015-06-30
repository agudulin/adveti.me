import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible/addons";

class AdminPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }
  render() {
    const { user } = this.props;

    return (
      <div>
        <p>
          <strong>Role</strong>: {user.role}<br/>
          <strong>Id</strong>: {user.twitter.id}<br/>
          <strong>Token</strong>: {user.twitter.token}<br/>
          <strong>Username</strong>: {user.twitter.username}
        </p>

        <a href="/logout">Logout</a>
      </div>
    );
  }

}

AdminPage = connectToStores(AdminPage, ["AuthStore"],
  (stores) => ({
    user: stores.AuthStore.getUser()
  })
);

export default AdminPage;
