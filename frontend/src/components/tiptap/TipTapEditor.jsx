import React from "react";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export default function TipTapEditor({ value, onChange }) {

    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false); // el segundo parámetro evita que dispare onUpdate
        }
    }, [value, editor]);

    /*useEffect(() => {
        if (editor && JSON.stringify(value) !== JSON.stringify(editor.getJSON())) {
            editor.commands.setContent(value)
        }
    }, [value, editor])*/

    const toolbarButtons = [
        {
            label: 'B',
            command: (editor) => editor.chain().focus().toggleBold().run(),
            isActive: (editor) => editor.isActive('bold'),
            className: 'font-bold',
        },
        {
            label: 'I',
            command: (editor) => editor.chain().focus().toggleItalic().run(),
            isActive: (editor) => editor.isActive('italic'),
            className: 'italic',
        },
        {
            label: '• Lista',
            command: (editor) => editor.chain().focus().toggleBulletList().run(),
            isActive: (editor) => editor.isActive('bulletList'),
        },
        {
            label: 'H2',
            command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: (editor) => editor.isActive('heading', { level: 2 }),
        },
    ]


    return (
        <>
            <div className="w-full border border-gray-300 rounded text-black overflow-hidden">
                {/* Toolbar */}
                <div className="flex gap-2 border-b border-gray-300 bg-gray-100 p-2 text-sm">
                    {toolbarButtons.map((btn, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => btn.command(editor)}
                            className={`cursor-pointer hover:bg-gray-200 rounded px-1 ${btn.className || ''} ${btn.isActive(editor) ? 'text-blue-600' : ''}`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Editor */}
                <div className="h-48 overflow-y-auto p-2">
                    <EditorContent
                        editor={editor}
                        className="h-full px-3 py-2 [&>div]:outline-none [&>div]:min-h-full"
                    />
                </div>
            </div>
            {/*<div className="border border-gray-300 rounded text-black w-full h-48 overflow-y-auto">
            <EditorContent
                editor={editor}
                className="h-full px-3 py-2 outline-none [&>div]:min-h-full"
            />
        </div>*/}
        </>
    )
}