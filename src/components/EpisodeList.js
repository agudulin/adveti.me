import React, { Component, PropTypes } from "react";

if (process.env.CLIENT) {
  require("../style/Episode.css");
}

class Episode extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const { videos, name } = this.props.data;

    return (
        <li className="Episode">
          <span className="Episode__name">{name}</span>
          <div className="Episode__links">{
            videos.map((link, idx) =>
              <a className="Episode__video-link" href={link.url} key={idx}>{link.name}</a>
            )
          }</div>
        </li>
    );
  }
}

class EpisodeList extends Component {
  static propTypes = {
    episodes: PropTypes.array.isRequired
  }

  render() {
    const { episodes } = this.props;

    return (
        <ul className="EpisodeList">{
          episodes.map((episode, idx) =>
            <Episode data={episode} key={idx} />
          )
        }</ul>
    );
  }

}

export default EpisodeList;
