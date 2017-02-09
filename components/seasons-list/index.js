import React from 'react'
import Link from 'next/link'

export default () => (
  <ul>
    <li><Link href='/season/1'><a>Season 1</a></Link></li>
    <li><Link href='/season/2'><a>Season 2</a></Link></li>
    <li><Link href='/season/3'><a>Season 3</a></Link></li>
    <li><Link href='/season/4'><a>Season 4</a></Link></li>
    <li><Link href='/season/5'><a>Season 5</a></Link></li>
    <li><Link href='/season/6'><a>Season 6</a></Link></li>
    <li><Link href='/season/7'><a>Season 7</a></Link></li>
    <li><Link href='/season/8'><a>Season 8</a></Link></li>

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
