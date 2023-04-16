import React from "react";
import './userNav.scss'

function userNav(props) {
    const user = props.user
    const setUser = props.setUser

    const signIn = () => {
        window.open(`${props.url}/auth/login`, "_self");
    }
    const signOut = () => {
        window.open(`${props.url}/auth/logout`, "_self");
        sessionStorage.removeItem("user");
        setUser(null)
    }
    if (!user) {
        return (<div className="user-nav">
            <button className="btn" onClick={signIn}>
                <span className="sign-up">Sign-Up</span>
            </button>
        </div>)
    } else {
        return (<div className="user-nav">
            <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-logo" ><img referrerPolicy="no-referrer" src={user.pfp} /></div>
            </div>
            <button className="btn" onClick={signOut}>LogOut</button>
        </div>)
    }
}

export default userNav;
//branch
