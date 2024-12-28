"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Editor } from "@monaco-editor/react";
import React from "react";

const CodeEditor = () => {
  return (
    <Card className="bg-zinc-900 border-zinc-800 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Code Editor</CardTitle>
        <Button className="bg-blue-800 hover:bg-blue-700"> Run Code</Button>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="python"
          //   value={code}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            contextmenu: false,
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
