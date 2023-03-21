import React, { useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './TextEditor.scss'
import { useParams } from 'react-router-dom'

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


const TextEditor = () => {
    const { id } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(() => {
    }, [socket, quill, id])

    useEffect(() => {
        const sock = io("http://localhost:3001", { query: { id } },
        )
        sock.emit('join', id)
        setSocket(sock)
        return () => {
            sock.disconnect()
        }
    }, [])

    useEffect(() => {
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }
        quill && quill.on('text-change', handler)
        return () => {
            quill && quill.off('text-change', handler)
        }
    }, [socket, quill])

    useEffect(() => {
        const handler = (delta) => {
            quill && quill.updateContents(delta)
        }
        socket && socket.on('recv-changes', handler)
        return () => {
            socket && socket.off('recv-changes', handler)
        }
    }, [socket, quill])

    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
        setQuill(q)
    }, [])

    return (
        <div className='Container' ref={wrapperRef}></div>
    )
}

export default TextEditor