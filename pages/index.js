import React, { Component } from 'react'
import Head from 'next/head'

export default class App extends Component {
  render () {
    return (
      <div>
        <Head>
          <title>adveti.me</title>
          <meta charSet='utf-8' />
          <meta content='initial-scale=1.0, width=device-width' name='viewport' />
        </Head>

        adveti.me
        <p>soon <span>.............</span></p>

        <style jsx>{`
          p {
            color: #555;
            margin: 0;
            font-size: 1rem;
          }
          span {
            color: #333;
          }
        `}</style>
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
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    )
  }
}
