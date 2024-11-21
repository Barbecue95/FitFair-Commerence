"use client";

import BulletList from "@tiptap/extension-bullet-list";
import Collaboration from "@tiptap/extension-collaboration";
import Heading from "@tiptap/extension-heading";
import { Highlight } from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { ToolBar } from "./TooBar";

const yDocs = new Map();

// Check if the Y.Doc exists, or create it
if (!yDocs.has("tip-test")) {
  yDocs.set("tip-test", new Y.Doc());
}

// Retrieve the Y.Doc
const ydoc = yDocs.get("tip-test");

const provider = new WebrtcProvider("tip-test", ydoc);

export function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Collaboration.configure({
        document: ydoc,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Highlight,
      Image,
      ImageResize,
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2",
      },
    },
  });

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
