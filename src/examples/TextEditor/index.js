"use client"

import React, { useState, useEffect, lazy, Suspense } from "react"
import "react-quill/dist/quill.snow.css"

const ReactQuill = lazy(() => import("react-quill"))

const TextEditor = ({ value, onChange, extraProps = {} }) => {
    const [mounted, setMounted] = useState(false)
    const [localValue, setLocalValue] = useState(value)
    const quillRef = React.useRef(null)
    const prevValue = React.useRef(value);

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (quillRef.current) {
            quillRef.current.getEditor().blur(); // Ensures TextEditor doesn’t steal focus
        }
    }, []);

    useEffect(() => {
        if (prevValue.current !== value) {
            prevValue.current = value;
        }
    }, [value]);

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    const imageHandler = () => {
        const url = prompt("Enter the image URL:")
        if (url) {
            const quill = quillRef.current.getEditor()
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, "image", url, "user")
        }
    }

    const modules = {
        toolbar: {
            container: [
                [{ font: [] }, { size: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                ["link", "image", "video"],
                ["blockquote", "code-block"],
                ["clean"],
            ],
            // handlers: {
            //     image: imageHandler,
            // },
        },
    }

    const formats = [
        "font",
        "size",
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "script",
        "link",
        "image",
        "video",
        "formula",
        "list",
        "bullet",
        "indent",
        "align",
        "link",
        "image",
        "video",
        "blockquote",
        "code-block",
    ]

    const handleChange = (content, delta, source, editor) => {
        setLocalValue(content)
        if (onChange) {
            onChange(editor.getHTML())
        }
    }



    if (!mounted) return null

    return (
        <Suspense fallback={<div>Loading Editor...</div>}>
            <p style={{ fontSize: "12px", color: "gray" }}>For each image that are added here should be within 100Kb</p>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={modules}
                formats={formats}
                value={prevValue.current}
                onChange={handleChange}
                style={{ height: "300px" }}
                {...extraProps}
            />

        </Suspense>
    )
}

export default TextEditor

