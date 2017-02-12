import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({ children, title }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta content='initial-scale=1.0, width=device-width' name='viewport' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black' />
    </Head>

    <main>{ children }</main>

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

      #nprogress .bar {
        background: white;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
      }
    `}</style>
  </div>
)
