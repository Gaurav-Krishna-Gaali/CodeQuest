"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Logs from "./Logs";
import axios from "axios";

const CodeEditor = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const [gifURL, setGifUrl] = useState("");
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const callAPI = async () => {
    try {
      const res = await fetch(
        `https://g.tenor.com/v1/random?q=brahmi&key=LIVDSRZULELA`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const gifUrl = data.results[0].media[0].gif.url;
        setGifUrl(gifUrl);
      } else {
        console.log("No GIF found in the response");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();

    editor.onKeyDown(async (event) => {
      const { keyCode, ctrlKey, metaKey } = event;
      if (
        (keyCode === 33 || keyCode === 52 || keyCode === 54) &&
        (metaKey || ctrlKey)
      ) {
        event.preventDefault();
        await callAPI();
        setOpen(true);
      }
    });
  };

  const runcode = async () => {
    if (!editorRef.current) return;

    const code = editorRef.current.getValue();
    const language = "python";
    const version = "*";

    setLoading(true);
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language,
          version,
          files: [{ content: code }],
          stdin: "",
        }
      );
      console.log(response.data);
      setOutput(
        response.data.run.stdout || response.data.run.stderr || "No output"
      );
      setShowLogs(true);
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("An error occurred while running the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" relative flex flex-col h-full">
      <Card className="bg-zinc-900 border-zinc-800 flex flex-col flex-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-base">Code Editor</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-bold text-black">
                  Oops! Copy-Paste Alert!
                </DialogTitle>
                <DialogDescription className="font-normal text-black">
                  Looks like you went full Ctrl+C, Ctrl+V on me! 🚨 No worries,
                  it happens to the best of us. Let’s keep it spicy and original
                  next time! 🌶️
                </DialogDescription>
              </DialogHeader>
              {gifURL && (
                <Image
                  unoptimized
                  src={gifURL}
                  width={400}
                  height={400}
                  alt="Funny copy-paste"
                  className="rounded-lg shadow-lg"
                />
              )}
              <DialogFooter>
                <Button type="submit" onClick={() => setOpen(false)}>
                  You got me lol! 😂
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="bg-zinc-500" onClick={runcode} disabled={loading}>
            {loading ? "Running..." : "Run "}
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden flex flex-col relative">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="python"
            onMount={onMount}
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
        {/* {output && <Logs output={output} />} */}
      </Card>
      {showLogs && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/90 text-white p-4 shadow-lg max-h-64 overflow-auto transition-transform transform translate-y-0">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Logs</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowLogs(false)}
            >
              Close
            </Button>
          </div>
          <pre className="text-sm">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
