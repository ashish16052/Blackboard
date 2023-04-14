import React from "react"
import "./RecentDoc.scss"
function RecentDoc(props){
    const doc = props.Document
    console.log(doc.imgURL);
    return (
        <div className="recentDoc">
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