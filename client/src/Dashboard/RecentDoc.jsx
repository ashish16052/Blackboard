import React from "react"
import "./RecentDoc.scss"
import { useNavigate } from "react-router-dom";

function RecentDoc(props){
    const doc = props.Document
    const navigate = useNavigate();
    function openRecentDoc(){
        navigate("/doc/"+doc.id);
    }
    return (
        <div className="recentDoc" onClick={openRecentDoc}>
            <img src={doc.imgURL} alt="" />
            <p className="title">{doc.title}</p>
            <div className="recDocDetails">
                <div className="recLogo">{doc.logo}</div>
                <div className="date">{doc.date}</div>
            </div>
        </div>
    )
}

export default RecentDoc;