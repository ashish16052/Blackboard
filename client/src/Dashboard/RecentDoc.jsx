import React from "react"
import "./RecentDoc.scss"
import { useNavigate } from "react-router-dom";
import docimg from '../assets/docs.png' 

function RecentDoc(props){
    const doc = props.Document
    const navigate = useNavigate();
    function openRecentDoc(){
        navigate("/doc/"+doc._id);
    }
    return (
        <div className="recentDoc" onClick={openRecentDoc}>
            <img src={docimg} alt="" />
            <p className="title">{doc._id}</p>
            <div className="recDocDetails">
                <div className="date">{doc.cdate}</div>
            </div>
        </div>
    )
}

export default RecentDoc;