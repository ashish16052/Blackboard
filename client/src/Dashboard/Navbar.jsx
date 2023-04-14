import React from "react";
import "./Navbar.scss"
function Navbar(){
    return (
        <div className="navbar">
            <div className="Logo">
                <div className="logo">📄</div>
                <div className="doc-logo">BlackBoard</div>
            </div>
            <div className="search">
                <input type="search" placeholder="🔍 Search" />
            </div>
            <div className="login">
                <button className="login-btn">👤</button>
            </div>
        </div>
    )
}

export default Navbar;