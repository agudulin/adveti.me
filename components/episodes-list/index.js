import React from 'react'
import uuid from 'uuid/v4'

export default ({ episodes, season }) => (
  <ul>
    {
      episodes.map(e => (
        <li key={uuid()}>
          <img
            className='poster'
            src={e.poster}
          />
          <h3>{ `${e.id} - ${e.name}` }</h3>
          <div className='video-links'>
            {
              e.videos.map(v => (
                <a className='video-links__item' key={uuid()} href={v.url}>{ v.name }</a>
              ))
            }
          </div>
        </li>
        ))
    }
    <style jsx>{`
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
      }
      li {
        flex-grow: 1;
        min-width: 50%;
        position: relative;
        overflow: hidden;
      }
      .poster {
        width: calc(100% + 2rem);
        margin: -1rem 0 0 -1rem;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .3;
      }
      h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: bold;
        padding: .75rem 1rem;
        position: relative;
      }
      a {
        font-size: 1rem;
        color: white;
        text-decoration: none;
      }
      a:hover {
        color: gray;
      }
      .video-links {
        position: relative;
        padding: .75rem 1rem;
        display: flex;
        flex-direction: column;
      }
      .video-links__item {
        font-size: .8rem;
        padding: .5rem 0 0;
        color: #bbb;
      }

      @media (min-width: 480px) {
        .video-links {
          flex-direction: row;
        }
        .video-links__item {
          padding: 0 .3rem 0 0;
          margin-right: .5rem;
          position: relative;
        }
        .video-links__item:not(:last-child):after {
          content: ',';
          position: absolute;
          right: 0;
        }
      }

      @media (min-width: 1200px) {
        ul {
          flex-direction: row;
        }
        li {
          padding: 2rem;
        }
      }
    `}</style>
  </ul>
)
