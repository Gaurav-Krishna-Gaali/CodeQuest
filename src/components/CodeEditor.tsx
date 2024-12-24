import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import React, { useRef, useState } from "react";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const [value, setValue] = useState("");
  return (
    <Card className="h-full rounded-none border-x-0 border-t-0 ">
      <CardHeader className="border-b px-6 py-4">
        <CardTitle>Code Editor</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Editor
          theme="vs-dark"
          height="60vh"
          defaultLanguage="python"
          value={value}
          defaultValue="# Write your code here..."
          onChange={(value) => setValue(value)}
          onMount={onMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
