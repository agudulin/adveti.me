import React from 'react'
import uuid from 'uuid/v4'

import { colors, media } from '../../styles'

export default ({ videos }) => (
  <div className='video-links'>
    {
      videos.map(({ name, url }, i) =>
        <a className='video-links__item' key={uuid()} href={url}>
          { name }
          { i !== videos.length - 1 &&
            <span className='video-links__comma'>,</span>
          }
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
        color: ${colors.videoLinkItem};
        text-decoration: none;
      }
      .video-links__item:hover {
        color: ${colors.videoLinkItemHover};
      }
      .video-links__comma {
        display: none;
      }

      @media (min-width: ${media.mobile}) {
        .video-links {
          flex-direction: row;
        }
        .video-links__item {
          position: relative;
          padding-right: .3rem;
        }
        .video-links__comma {
          display: inline-block;
          color: ${colors.videoLinkItem};
        }
      }
    `}</style>
  </div>
)
