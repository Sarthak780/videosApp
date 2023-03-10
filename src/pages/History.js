import React,{useEffect, useState} from 'react'
import "./history.css"
import {Link} from 'react-router-dom'


const History = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/history")
    .then(res => res.json())
    .then(res => setHistory(res))
  })

  return (
    <div className='histories'>
    <Link to="/">Home</Link>
      {history.map(val => (
        <div className='history'>
          <p>Name : {val.name}</p>
          <p>Link : {val.link}</p>
          <p>Time : {val.time}</p>
        </div>


      ))}
    </div>
  )

}

export default History
