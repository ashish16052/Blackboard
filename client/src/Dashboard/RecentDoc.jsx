import React from "react"
import "./RecentDoc.scss"
import { useNavigate } from "react-router-dom";
import docimg from '../assets/docs.png'

function RecentDoc(props) {
    const doc = props.Document
    const navigate = useNavigate();
    function openRecentDoc() {
        navigate("/doc/" + doc._id);
    }
    const formatdate = (d) => {
        var d = new Date(d);
        var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
        return datestring
    }
    return (
        doc &&
        <div className="recentDoc" onClick={openRecentDoc}>
            <img src={docimg} alt="" />
            <div className="recDocDetails">
                <p className="title">{doc.title}</p>
                <div className="date">{formatdate(doc.cdate)}</div>
            </div>
        </div>
    )
}

export default RecentDoc;