import React, { Component } from 'react'
import 'isomorphic-fetch'

import Page from '../layouts/main'
import EpisodesList from '../components/episodes-list'

class Season extends Component {
  static async getInitialProps ({ query: { n: season } }) {
    return new Promise((resolve, reject) =>
      global.fetch(`https://api.adveti.me/season/${season}`)
        .then(res => res.json())
        .then(episodes => resolve({ episodes, season }))
        .catch(error => reject(`fail: ${error}`))
    )
  }

  render () {
    const { episodes, season } = this.props

    return (
      <Page title={`Season ${season}`}>
        <EpisodesList episodes={episodes} />
      </Page>
    )
  }
}

export default Season
