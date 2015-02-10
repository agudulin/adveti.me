var React = require('react');
var Router = require('react-router');
var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link,
    RouteHandler = Router.RouteHandler;
var Loader = require('react-loader');

var PageLayout = require('./PageLayout');
var SeasonEpisodeStore = require('./EpisodeStore');

var MainPage = React.createClass({
  getInitialState: function() {
    return {
      episodes: {},
      loaded: false
    };
  },
  componentWillMount: function() {
    SeasonEpisodeStore.init();
  },
  componentDidMount: function() {
    SeasonEpisodeStore.addChangeListener(this.updateEpisodes);
  },
  componentWillUnmount: function() {
    SeasonEpisodeStore.removeChangeListener(this.updateEpisodes);
  },
  updateEpisodes: function() {
    if (!this.isMounted()) {
      return;
    }
    this.setState({
      episodes: SeasonEpisodeStore.getEpisodes(),
      loaded: true
    });
  },
  render: function() {
    return (
      <PageLayout headerRoute="main">
        <aside className="seasons-navigation">
          <SeasonNavigationBox seasons={Object.keys(this.state.episodes)} />
        </aside>

        <article className="main">
          <Loader loaded={this.state.loaded}>
            <RouteHandler />
          </Loader>
        </article>
      </PageLayout>
    );
  }
});

var SeasonNavigationBox = React.createClass({
  render: function() {
    var seasonNodes = this.props.seasons.map(function(season, index) {
      return (
        <li key={index}>
          <Link to="season" params={{ season: season }} className="btn">
            {"Season " + season}
          </Link>
        </li>
      );
    }.bind(this));
    return (
      <ul className="seasons-navbar">
        {seasonNodes}
      </ul>
    );
  }
});

var Episode = React.createClass({
  render: function() {
    var linkNodes = this.props.data.videos.map(function(link, index) {
      return (
        <a className="episode-video-link" href={link.url} key={index}>{link.name}</a>
      );
    });
    return (
      <li>
        <span className="episode-name">{this.props.data.name}</span>
        <div className="episode-links">{linkNodes}</div>
      </li>
    );
  }
});
var EpisodeList = React.createClass({
  render: function() {
    var episodeNodes = this.props.data.map(function(episode, index) {
      return (
        <Episode data={episode} key={index} />
      )
    });
    return (
      <ul className="episodes-navbar">
        {episodeNodes}
      </ul>
    );
  }
});

var Season = React.createClass({
  mixins: [Router.State],
  getStateFromStore: function() {
    var season = this.getParams().season;
    return {
      episodes: SeasonEpisodeStore.getSeasonEpisodes(season)
    };
  },
  getInitialState: function() {
    return this.getStateFromStore();
  },
  componentDidMount: function() {
    SeasonEpisodeStore.addChangeListener(this.updateSeasonEpisodes);
  },
  componentWillUnmount: function() {
    SeasonEpisodeStore.removeChangeListener(this.updateSeasonEpisodes);
  },
  componentWillReceiveProps: function() {
    this.setState(this.getStateFromStore());
  },
  updateSeasonEpisodes: function() {
    if (!this.isMounted()) {
      return;
    }
    this.setState(this.getStateFromStore());
  },
  render: function() {
    var episodes = this.state.episodes || [];
    return (
      <EpisodeList data={episodes} />
    );
  }
});

var BmoVision = React.createClass({
  mixins: [Router.State],
  render: function() {
    return (
      <p className="bmo-vision">
        <img src="/images/bmo-vision.jpg" />
      </p>
    );
  }
});

module.exports = {
  MainPage: MainPage,
  Season: Season,
  BmoVision: BmoVision
}
