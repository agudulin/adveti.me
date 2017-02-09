import React, { Component } from 'react'
//import 'isomorphic-fetch'

class Season extends Component {
  static getInitialProps ({ query: { n: number } }) {
    //const res = await fetch('fetch-api-here')
    //const json = await res.json()

    return { number }
  }

  render () {
    return (
      <div>{ this.props.number }</div>
    )
  }
}

export default Season
