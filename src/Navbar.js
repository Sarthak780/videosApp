import React from 'react'
import {Link} from 'react-router-dom'
import "./navbar.css"


const Navbar = () => {
  return (
    <div className='nav'>
    <Link to="/" >Home</Link>
    <Link to="/history" >History</Link>
    </div>
  )
}

export default Navbar
