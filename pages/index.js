import React, { Component } from 'react'

import Page from '../layouts/main'
import SeasonsList from '../components/seasons-list'

export default class App extends Component {
  render () {
    return (
      <Page title='adveti.me'>
        <SeasonsList />
      </Page>
    )
  }
}
