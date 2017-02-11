import React, { Component } from 'react'
import 'isomorphic-fetch'

import Page from '../layouts/main'

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
      <Page title=''>
        <ul>
          {
            this.props.episodes.map(e => (
              <li key={e.name}>
                <a href={e.url}>{ e.name }</a>
                <div>
                  {
                    e.videos.map(v => (
                      <a className='video-link' href={v.url}>{ v.name }</a>
                    ))
                  }
                </div>
              </li>
            ))
          }
        </ul>
        <style jsx>{`
          a {
            font-size: 1rem;
            color: white;
            text-decoration: none;
          }
          a:hover {
            color: gray;
          }
          .video-link {
            font-size: .8rem;
            padding: 0 .5rem 0 0;
          }
        `}</style>
      </Page>
    )
  }
}

export default Season
