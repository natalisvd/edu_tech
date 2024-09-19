"use client";
import React, { useState } from "react";
import Editor, { Value } from "@react-page/editor";
import slate from "@react-page/plugins-slate";
import image from "@react-page/plugins-image";
import spacer from "@react-page/plugins-spacer";
import divider from "@react-page/plugins-divider";
import highlightPlugin from "@react-page/plugins-slate";

import "@react-page/editor/lib/index.css";
import "@react-page/plugins-slate/lib/index.css";
import "@react-page/plugins-image/lib/index.css";

const slatePlugin = slate();
const highlight = highlightPlugin();
const imagePlugin = image;
const spacerPlugin = spacer;
const dividerPlugin = divider;

const cellPlugins = [
  slatePlugin,
  highlight,
  imagePlugin,
  spacerPlugin,
  dividerPlugin,
];

export const LessonPageEditor = () => {
  const [editorState, setEditorState] = useState<Value | null>(null);

  return (
    <div>
      <Editor
        cellPlugins={cellPlugins}
        value={editorState}
        onChange={setEditorState}
      />
      <div className="mt-4">
        <button
          onClick={() => console.log("Editor State:", editorState)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save Page
        </button>
      </div>
    </div>
  );
};

export default LessonPageEditor;
