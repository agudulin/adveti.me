import React from 'react'
import LazyLoad from 'react-lazyload'
import uuid from 'uuid/v4'

import VideoLinks from '../video-links'
import { media } from '../../styles'

export default ({ episodes, season }) => (
  <ul className='episodes-list'>
    {
      episodes.map(({ id, name, poster, videos }) =>
        <li className='episodes-list__item' key={uuid()}>
          <LazyLoad height='100%'>
            <img className='episodes-list__poster' src={poster} />
          </LazyLoad>
          <h3 className='episodes-list__title'>{ `${id} - ${name}` }</h3>
          <VideoLinks videos={videos} />
        </li>
      )
    }
    <style jsx>{`
      .episodes-list {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
      }
      .episodes-list__item {
        flex-grow: 1;
        min-width: 50%;
        position: relative;
        overflow: hidden;
      }
      .episodes-list__poster {
        width: 120%;
        margin: -10% 0 0 -10%;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .3;
      }
      .episodes-list__title {
        margin: 0;
        font-size: 1rem;
        font-weight: bold;
        padding: .75rem 1rem;
        position: relative;
      }

      @media (min-width: ${media.desktop}) {
        .episodes-list {
          flex-direction: row;
        }
        .episodes-list__item {
          padding: 2rem;
        }
      }
    `}</style>
  </ul>
)
