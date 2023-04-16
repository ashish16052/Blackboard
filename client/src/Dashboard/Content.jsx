import React from "react"
import RecentDoc from "./RecentDoc"
import "./Content.scss"
import { useNavigate } from "react-router-dom"

function Content() {
    const navigate = useNavigate();
    function openNewDoc(){
        navigate("/newdoc");
    }

    const Documents = [
        {
            id: 1,
            imgURL: "https://th.bing.com/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?w=122&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            title: "IOT PPT",
            logo: "👤",
            date: Date.now()
        },
        {
            id: 1,
            imgURL: "https://th.bing.com/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?w=122&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            title: "IOT PPT",
            logo: "👤",
            date: Date.now()
        },
        {
            id: 1,
            imgURL: "https://th.bing.com/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?w=122&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            title: "IOT PPT",
            logo: "👤",
            date: Date.now()
        },
        {
            id: 1,
            imgURL: "https://th.bing.com/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?w=122&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            title: "IOT PPT",
            logo: "👤",
            date: Date.now()
        },
        {
            id: 2,
            imgURL: "https://th.bing.com/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?w=122&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            title: "IOT PPT",
            logo: "👥",
            date: Date.now()
        },
        {
            id: 3,
            imgURL: "https://th.bing.com/th/id/OIP.2bJ9_f9aKoGCME7ZIff-ZwHaJ4?w=122&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            title: "IOT PPT",
            logo: "👥",
            date: Date.now()
        },
        
    ]

    return (
        <div className="content">
            <h2>Documents</h2>
            <section className="Docs">
                <div className="plus-sign" onClick={openNewDoc}>➕</div>
                {
                    Documents.map(Documents => {
                        return (
                            <RecentDoc
                                Document={Documents}
                            />
                        )
                    })
                }
            </section>
        </div>
    )
}
export default Content;