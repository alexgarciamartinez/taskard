import React from "react";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function ViewTipTapText({ content, className = '' }) {

   const editor = useEditor({
        extensions: [StarterKit],
        content: content || '',
        editable: false,
    })

    if (!editor) return null

    return (
        <div className={className}>
            <EditorContent editor={editor} />
        </div>
    )
}