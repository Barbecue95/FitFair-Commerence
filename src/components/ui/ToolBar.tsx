"use client";

import { Toggle } from "@/components/ui/toggle";
import { type Editor } from "@tiptap/react";
import { Bold, Heading2 } from "lucide-react";

type Props = {
  editor: Editor | null;
};

export function ToolBar({ editor }: Props) {
  if (!editor) return null;
  return (
    <div className="border border-input bg-transparent rounded-md">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
