import React from 'react'
import Link from 'next/link'
import uuid from 'uuid/v4'

import { borders, colors, media } from '../../styles'

const seasons = [...Array(8)].map((_, n) => n + 1)

export default () => (
  <ul className='seasons-list'>
    {
      seasons.map(n =>
        <li className='seasons-list__item' key={uuid()}>
          <Link href={`/season?n=${n}`}>
            <a className='seasons-list__link'>Season { n }</a>
          </Link>
        </li>
      )
    }
    <style jsx>{`
      .seasons-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        height: 100%;
        width: 100%;
        position: absolute;
        flex-direction: column;
      }
      .seasons-list__item {
        flex-grow: 1;
        min-width: 25%;
        border: ${borders.seasonListItem};
        position: relative;
        overflow: hidden;
        background-color: ${colors.seasonListItem};
      }
      .seasons-list__link {
        color: ${colors.seasonListLink};
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 100%;
        width: 100%;
        transition: color .1s ease;
      }
      .seasons-list__link:hover {
        color: ${colors.seasonListLinkHover};
      }

      @media (min-width: ${media.mobile}) {
        .seasons-list {
          flex-direction: row;
        }
      }
      @media (min-width: ${media.desktop}) {
        .seasons-list__link {
          font-size: 2rem;
        }
      }
    `}</style>
  </ul>
)
