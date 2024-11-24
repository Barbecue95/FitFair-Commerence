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

// Declare custom property on the Window interface
declare global {
  interface Window {
    webrtcProvider?: WebrtcProvider;
  }
}

const yDocs = new Map();

if (!yDocs.has("tip-test")) {
  yDocs.set("tip-test", new Y.Doc());
}

// Ensure code runs only on the client side
let provider: WebrtcProvider | undefined;
if (typeof window !== "undefined") {
  if (!window.webrtcProvider) {
    provider = new WebrtcProvider("tip-test", yDocs.get("tip-test"));
    window.webrtcProvider = provider;
  } else {
    provider = window.webrtcProvider;
  }
}

export function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (richText: string) => void;
}) {
  // Only initialize the editor on the client side
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Collaboration.configure({
        document: yDocs.get("tip-test"), // Use the existing Y.Doc
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
        class: "min-h-[156px] border rounded-md bg-slate-50 p-2",
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
