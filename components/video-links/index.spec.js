import React from 'react'
import renderer from 'react-test-renderer'

import VideoLinks from './'

const basicProps = {
  videos: [{
    url: 'video-url-1',
    name: 'video-name-1'
  }, {
    url: 'video-url-2',
    name: 'video-name-2'
  }]
}

describe('VideoLinks', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <VideoLinks {...basicProps} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
