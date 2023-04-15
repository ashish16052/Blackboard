import React from "react";

function userNav(props) {
    const details  = props.details;
    if (!props.isRegistered) {
        return (<div>
            <button className="btn">
                <span className="sign-up">Signup</span>
            </button>
            <button className="btn">
                <span className="log-in">Login</span>
            </button>
        </div>)
    } else {
        return (<div>
            <div className="user-details">
                <div className="user-name">{details[0].name}</div>
                <div className="user-logo">{details[0].userLogo}</div>
            </div>
            <button className="logout-btn">LogOut</button>
        </div>)
    }
}

export default userNav;
//branch
