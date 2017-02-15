import React from 'react'
import uuid from 'uuid/v4'

import VideoLinks from '../video-links'

export default ({ episodes, season }) => (
  <ul className='episodes-list'>
    {
      episodes.map(({ id, name, poster, videos }) =>
        <li className='episodes-list__item' key={uuid()}>
          <img className='episodes-list__poster' src={poster} />
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
        width: calc(100% + 2rem);
        margin: -1rem 0 0 -1rem;
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

      @media (min-width: 1200px) {
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
