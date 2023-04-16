import React, { useEffect, useState } from "react"
import RecentDoc from "./RecentDoc"
import "./Content.scss"
import { v4 as uuidV4 } from 'uuid'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Content(props) {
    const user = props.user
    const url = props.url
    const [Documents, setDocuments] = useState([])

    const navigate = useNavigate();
    function openNewDoc() {
        if (user)
            navigate(`/doc/${uuidV4()}`);
        else
            window.open(`${props.url}/auth/login`, "_self");
    }

    const getDocs = async () => {
        const { data } = await axios.get(`${props.url}/doc/readdoc/${user._id}`, { withCredentials: true })
        console.log(data);
        if (data) {
            setDocuments(data);
        }
    }

    useEffect(() => {
        getDocs()
    }, [user])


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