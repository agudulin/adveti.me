import React from 'react'
import renderer from 'react-test-renderer'

import EpisodesList from './'

jest.mock('react-dom')

const basicProps = {
  season: 1,
  episodes: [{
    id: '01a',
    poster: 'poster-url-1',
    name: 'episode-name-1',
    videos: [{
      url: 'video-url-1',
      name: 'video-name-1'
    }]
  }, {
    id: '01b',
    poster: 'poster-url-2',
    name: 'episode-name-2',
    videos: [{
      url: 'video-url-1',
      name: 'video-name-1'
    }]
  }]
}

describe('EpisodesList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <EpisodesList {...basicProps} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
