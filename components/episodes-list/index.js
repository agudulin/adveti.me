import React from 'react'
import uuid from 'uuid/v4'

export default ({ episodes }) => (
  <ul>
    {
      episodes.map(e => (
        <li key={uuid()} style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%), url(${e.poster}) 0 0 no-repeat`,
          backgroundPosition: 'center',
          backgroundSize: '200% auto'
        }}>
          <h3>{ e.name }</h3>
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
        margin: 0;
        padding: 0;
        list-style: none;
      }
      h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: bold;
        padding: .75rem 1rem;
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
        padding: .75rem 1rem;
        display: flex;
        flex-direction: column;
      }
      .video-links__item {
        font-size: .8rem;
        padding: .5rem 0 0;
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
        .video-links__item:not(:last-child)::after {
          content: ',';
          position: absolute;
          right: 0;
        }
      }
    `}</style>
  </ul>
)
