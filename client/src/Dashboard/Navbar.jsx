import React from "react";
import "./Navbar.scss"
import UserNav from "./userNav";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
    const user = props.user
    const setUser = props.setUser
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
                <UserNav isRegistered={userRegistered} user={user} setUser={setUser} url={props.url}/>
            </div>
        </div>
    )
}

export default Navbar;