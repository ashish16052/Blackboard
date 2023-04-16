import React from "react";
import "./Navbar.scss"
import UserNav from "./userNav";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const user = {
        id: 1,
        name: "Jaideep Singh",
        userLogo: ""
    }
    const userRegistered = false;
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
            <div className="user-Nav">
                <UserNav isRegistered={userRegistered} user={user} />
            </div>
        </div>
    )
}

export default Navbar;