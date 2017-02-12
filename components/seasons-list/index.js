import React from 'react'
import Link from 'next/link'

export default () => (
  <ul>
    {
      [...Array(8)].map((_, n) => n + 1).map(n => (
        <li key={n}>
          <img className='poster' src={`/static/season-posters/${n}.jpg`} />
          <Link href={`/season?n=${n}`}>
            <a>Season {n}</a>
          </Link>
        </li>
      ))
    }

    <style jsx>{`
      ul {
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
      li {
        flex-grow: 1;
        min-width: 25%;
        border: 1px solid #222;
        position: relative;
        overflow: hidden;
      }
      .poster {
        position: absolute;
        top: 0;
        left: 0;
        opacity: .3;
        margin-left: -50%;
        margin-top: -50%;
        width: 300%;
      }
      a {
        color: white;
        cursor: pointer;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 100%;
        width: 100%;
        transition: font-size .1s ease;
      }
      a:hover {
        font-size: 1.75rem;
      }

      @media (min-width: 480px) {
        ul {
          flex-direction: row;
        }
        li {
          background-size: 100% auto;
        }
      }
    `}</style>
  </ul>
)
