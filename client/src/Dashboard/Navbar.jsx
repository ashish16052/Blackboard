import React from "react";
import "./Navbar.scss"
import UserNav from "./userNav";
import { useNavigate } from "react-router-dom";
import Details from "./Details";

let userRegistered = true;
function Navbar() {
    const navigate = useNavigate();
    function homePage() {
        navigate("/");
    }
    return (
        <div className="navbar">
            <div className="Logo" onClick={homePage}>
                <div className="logo">📄</div>
                <div className="doc-logo">BlackBoard</div>
            </div>
            <div className="search">
                <input type="search" placeholder="🔍 Search" />
            </div>
            <div className="user-Nav">
                <UserNav isRegistered={userRegistered} details={Details} />
            </div>
        </div>
    )
}

export default Navbar;