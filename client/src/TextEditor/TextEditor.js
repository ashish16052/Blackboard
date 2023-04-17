import React, { useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './TextEditor.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }, { font: [] }],
    [],
    ['bold', 'italic', 'underline', 'strike'],
    [],
    [{ color: [] }, { background: [] }],
    [],
    [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
    [],
    ['link', 'image', 'blockquote', 'code-block'],
]


const TextEditor = (props) => {
    const userid = props.user._id
    const { id } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const [title, setTitle] = useState('Untitled')

    const adddoc = async () => {
        const { data } = await axios.post(`${props.url}/user/adddoc/${userid}`, { docid: id }, { withCredentials: true })
        console.log(data);
    }

    useEffect(() => {
        console.log(title);
    }, [title])

    useEffect(() => {
        console.log(id, userid);
        const sock = io("http://localhost:3001", {
            query: {
                id: id,
                userid: userid,
            }
        },
        )
        adddoc()
        setSocket(sock)
        return () => {
            sock.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!socket || !quill)
            return
        const save = setInterval(() => {
            console.log(title);
            socket.emit('save', { title: title, data: quill.getContents() })
        }, 2000)
        return () => {
            clearInterval(save)
        }
    }, [socket, quill, title])

    useEffect(() => {
        if (!socket || !quill)
            return
        socket.once('load-doc', (doc) => {
            quill.setContents(doc.data)
            setTitle(doc.title)
            quill.enable()
        })
        socket.emit('join', id)
    }, [socket, quill, id])

    useEffect(() => {
        if (!socket || !quill)
            return
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }
        quill.on('text-change', handler)
        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (!socket || !quill)
            return
        const handler = (delta) => {
            quill.updateContents(delta)
        }
        socket.on('recv-changes', handler)
        return () => {
            socket.off('recv-changes', handler)
        }
    }, [socket, quill])

    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
        q.disable()
        setQuill(q)
    }, [])

    return (
        <div className='editor'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} name='title' type='text' className='title' />
            {title}
            <div className='Container' ref={wrapperRef}>
            </div>
        </div>
    )
}

export default TextEditor