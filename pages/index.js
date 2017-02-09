import React, { Component } from 'react'
import Head from 'next/head'

import SeasonsList from '../components/seasons-list'

export default class App extends Component {
  render () {
    return (
      <div>
        <Head>
          <title>adveti.me</title>
          <meta charSet='utf-8' />
          <meta content='initial-scale=1.0, width=device-width' name='viewport' />
        </Head>

        <main>
          <SeasonsList />
        </main>

        <style jsx global>{`
          :root {
            box-sizing: border-box;
            height: 100%;
          }
          *, *:before, *:after {
            box-sizing: inherit;
          }
          :root, body {
            height: 100%;
            margin: 0;
          }
          body {
            background-color: black;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            font-size: 1.5rem;
            display: flex;
          }
        `}</style>
      </div>
    )
  }
}
