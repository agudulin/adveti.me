import React from 'react'
import uuid from 'uuid/v4'

export default ({ videos }) => (
  <div className='video-links'>
    {
      videos.map(({ name, url }) =>
        <a className='video-links__item' key={uuid()} href={url}>
          { name }
        </a>
      )
    }
    <style jsx>{`
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
        text-decoration: none;
      }
      .video-links__item:hover {
        color: gray;
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
    `}</style>
  </div>
)
