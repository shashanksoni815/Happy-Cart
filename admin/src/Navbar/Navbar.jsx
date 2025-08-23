import React from 'react'
import "./Navbar.css"
import navlogo from "../assets/Admin_Assets/nav-logo.svg";
import navProfile from "../assets/Admin_Assets/nav-profile.svg";


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="navlogo" className='nav-logo' />
        <img src={navProfile} alt="navlogo" className='nav-profile' />
    </div>
  )
}

export default Navbar;