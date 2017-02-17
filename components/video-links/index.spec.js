import React from 'react'
import renderer from 'react-test-renderer'

import VideoLinks from './'

describe('VideoLinks', () => {
  it('renders correctly with one video link', () => {
    const videos = [{
      url: 'video-url-1',
      name: 'video-name-1'
    }]
    const tree = renderer.create(
      <VideoLinks videos={videos} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with lots of video links', () => {
    const videos = [{
      url: 'video-url-1',
      name: 'video-name-1'
    }, {
      url: 'video-url-2',
      name: 'video-name-2'
    }]
    const tree = renderer.create(
      <VideoLinks videos={videos} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
