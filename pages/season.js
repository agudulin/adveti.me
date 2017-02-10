import React, { Component } from 'react'
import 'isomorphic-fetch'

class Season extends Component {
  static async getInitialProps ({ query: { n } }) {
    return new Promise((resolve, reject) =>
      global.fetch(`https://api.adveti.me/season/${n}`)
        .then(res => res.json())
        .then(episodes => resolve({ episodes }))
        .catch(error => reject(`fail: ${error}`))
    )
  }

  render () {
    return (
      <ul>
        {
          this.props.episodes.map(e => (
            <li key={e.name}>{ e.name }, { e.url }</li>
          ))
        }
      </ul>
    )
  }
}

export default Season
