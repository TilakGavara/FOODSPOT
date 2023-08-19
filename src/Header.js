import React from "react";
import { Link } from "react-router-dom";
import image from "../static/1.jpg";
import image1 from"../static/3.avif";
const Header=()=>{
    const linkstyle={
        textDecoration:"None",
        color:"white"
    }
    const logo={
        borderRadius:"10px",
        width:"100px",
        height:"100px",
    }
    return(
        <div className="header">
        <img src={image} alt="logo" />
        <ul>
            <div>
            <li><Link style={linkstyle} to="/">Home</Link></li>
            <li><Link style={linkstyle} to="/login">Login</Link></li>
            <li><Link style={linkstyle} to="/about">About Us</Link></li>
            </div>
            <img src={image1} style={logo} alt="logo"/>
        </ul>
        </div>
    )
}

export default Header;