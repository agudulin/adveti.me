import React from 'react'
import renderer from 'react-test-renderer'

import SeasonsList from './'

const basicProps = {}

describe('SeasonsList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <SeasonsList {...basicProps} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
