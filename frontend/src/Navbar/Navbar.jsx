import "./Navbar.css";
import logo from "../assets/Frontend_Assets/logo.png";
import cart_icon from "../assets/Frontend_Assets/cart_icon.png";
import dropdown_icon from "../assets/Frontend_Assets/nav_dropdown.png";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

function Navbar() {

    const [menu, setMenu] = useState("home")
    const {getTotalCartItem} = useContext(ShopContext)
    const menuRef = useRef();
    const dropdownIconRef = useRef(null);


    const dropdown_toggle = (e) => {
        // menuRef.current.classList.toggle('nav-menu-visible');
        // e.target.classList.toggle('open');
        if (menuRef.current) {
        menuRef.current.classList.toggle('nav-menu-visible');
    }
    if (dropdownIconRef.current) {
        dropdownIconRef.current.classList.toggle('open');
    }
    }
    

    return ( 
            <div className="navbar">
                <div className="nav-logo">
                    <img src={logo} alt="logo" />
                    <p>Happy Cart</p>
                </div>
                <img ref={dropdownIconRef} className="nav-dropdown" onClick={dropdown_toggle} src={dropdown_icon} alt="" />
                <ul ref={menuRef} className="nav-menu">
                    <li onClick={()=> {setMenu("home")}} > <Link style={{textDecoration:"none"}} to="/">Home</Link>  {menu === "home"?<hr/>:<></>} </li>
                    <li onClick={()=> {setMenu("mens")}} ><Link style={{textDecoration:"none"}} to="/mens">Men</Link> {menu === "mens"?<hr/>:<></>} </li>
                    <li onClick={()=> {setMenu("womens")}} ><Link style={{textDecoration:"none"}} to="/womens">Women</Link> {menu === "womens"?<hr/>:<></>} </li>
                    <li onClick={()=> {setMenu("kids")}} ><Link style={{textDecoration:"none"}} to="/kids">Kids</Link> {menu === "kids"?<hr/>:<></>} </li>
                </ul>
                <div className="nav-login-cart">
                    {localStorage.getItem('auth-token')
                    ?<button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}} >Logout</button>:
                    <Link to="/login"><button>Login</button></Link>
                    }
                    <Link to="/cart"><img src={cart_icon} alt="icon" /></Link>
                    <div className="nav-cart-count">{getTotalCartItem()}</div>
                </div>
            </div>
      );
}

export default Navbar;