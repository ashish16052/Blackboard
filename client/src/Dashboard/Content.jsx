import React from "react"
import RecentDoc from "./RecentDoc"
import Documents from "./SavedDOC"
import "./Content.scss"

function Content() {
    return (
        <div className="content">
            <h2>Document</h2>
            <section className="Docs">
                <div className="plus-sign">➕</div>
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