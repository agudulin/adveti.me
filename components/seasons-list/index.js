import React from 'react'
import Link from 'next/link'

export default () => (
  <ul>
    {
      [...Array(8)].map((_, n) => (
        <li key={n}><Link href={`/season?n=${n + 1}`}><a>Season {n + 1}</a></Link></li>
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
      }
      li {
        flex-grow: 1;
        min-width: 25%;
        border: 1px solid #222;
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        cursor: pointer;
        text-decoration: none;
        width: 100%;
        height: 100%;
        transition: color .1s ease;
      }
      a:hover {
        color: #333;
      }
    `}</style>
  </ul>
)
