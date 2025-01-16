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
import axios from "axios";
import { Play, Save, Loader } from "lucide-react";
import { supabase } from "../utils/supabase/supabase";

const CodeEditor = ({ selectedQuestion, testResults, setTestResults }) => {
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

  const submitSolution = async () => {
    if (!editorRef.current) return;

    const code = editorRef.current.getValue();
    const questionId = selectedQuestion?.id;

    if (!code) {
      alert("Please write some code before submitting.");
      return;
    }
    if (!questionId) {
      alert("Please select a question before submitting.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Login to submit your solution.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/submit-solution",
        {
          question_id: selectedQuestion?.id,
          provider_id: user.id,
          code: code,
          language: "python",
          version: "3.10.0",
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setTestResults(response.data);
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
      alert("An error occurred while submitting your solution.");
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
          <div className="flex items-center gap-4">
            {/* Run Button */}
            <Button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg "
              onClick={runcode}
              disabled={loading}
            >
              {loading ? (
                <Loader className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
              <div className=" font-bold ">
                {loading ? "Running..." : "Run "}
              </div>
            </Button>

            <Button
              onClick={() => submitSolution()}
              className="box-border relative z-30 inline-flex items-center justify-center w-auto px-3 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1   hover:ring-offset-indigo-500 ease focus:outline-none"
            >
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm">
                <Save className="h-5 w-5 mr-2" />
                Submit
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden flex flex-col relative">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="python"
            onMount={onMount}
            value="## Write your code here... "
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
