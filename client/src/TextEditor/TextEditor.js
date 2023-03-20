import React, { useCallback } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './TextEditor.scss'

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
    
    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
    }, [])

    return (
        <div className='Container' ref={wrapperRef}></div>
    )
}

export default TextEditor