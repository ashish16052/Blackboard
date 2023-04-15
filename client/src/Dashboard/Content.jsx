import React from "react"
import RecentDoc from "./RecentDoc"
import Documents from "./SavedDOC"
import "./Content.scss"
import { useNavigate } from "react-router-dom"

function Content() {
    const navigate = useNavigate();
    function openNewDoc(){
        navigate("/newdoc");
    }

    return (
        <div className="content">
            <h2>Documents</h2>
            <section className="Docs">
                <div className="plus-sign" onClick={openNewDoc}>➕</div>
                {/* <h2>Recent documents</h2> */}
                {
                    Documents.map(Documents => {
                        return (
                            <RecentDoc
                                Document={Documents}
                            // key={Documents.id}
                            // img={Documents.imgURL}
                            // logo={Documents.logo}
                            // date={Documents.date}
                            />
                        )
                    })
                }
            </section>
        </div>
    )
}
export default Content;