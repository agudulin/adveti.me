import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible/addons";
import { updateSeasonData } from "../actions/ShowActionCreators";

class AdminPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isUpdating: PropTypes.bool
  }
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  updateSeasonData(e) {
    e.preventDefault();

    let season = React.findDOMNode(this.refs.seasonNumber).value;
    this.context.executeAction(updateSeasonData, { season: season });
  }

  render() {
    const { user, isUpdating } = this.props;

    return (
      <div>
        <p>
          <strong>Role</strong>: {user.role}<br/>
          <strong>Id</strong>: {user.twitter.id}<br/>
          <strong>Token</strong>: {user.twitter.token}<br/>
          <strong>Username</strong>: {user.twitter.username}
        </p>

        <form onSubmit={this.updateSeasonData.bind(this)}>
          <input type="number" ref="seasonNumber" defaultValue="6" />
          {
            isUpdating
            ? <button disabled="disabled">Updating&hellip;</button>
            : <button type="submit">Update</button>
          }
        </form>

        <a href="/logout">Logout</a>
      </div>
    );
  }

}

AdminPage = connectToStores(AdminPage, ["AuthStore", "ShowStore"],
  (stores) => ({
    user: stores.AuthStore.getUser(),
    isUpdating: stores.ShowStore.getIsUpdating()
  })
);

export default AdminPage;
