import React from "react";
import './userNav.scss'

function userNav(props) {
    const user  = props.user;
    if (!props.isRegistered) {
        return (<div>
            <button className="btn">
                <span className="sign-up">Sign-Up</span>
            </button>
        </div>)
    } else {
        return (<div>
            <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-logo">{user.userLogo}</div>
            </div>
            <button className="logout-btn">LogOut</button>
        </div>)
    }
}

export default userNav;
//branch
