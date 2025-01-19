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
import { Solutions, TestResult } from "@/types/types";
import AlertModal from "@/components/ui/alert-modal";

interface CodeEditorProps {
  solutions: Solutions[];
  setShowConfetti: (value: boolean) => void;
  fetchSubmittedSolutions: () => void;
  selectedQuestion: {
    id: number;
  } | null;
  testResults: TestResult[];
  setTestResults: (results: TestResult[]) => void;
}

const defaultCode = `def main(a):
        # Write your code here

        return a

    # Do not disturb the below snippet; it would be used for evaluation at the server
    if __name__ == "__main__":
      print(main(input()))`;

const defaultCode1 = `def main(inp):
    # Returns the sum of elements in the input list
    return sum(inp)

# Use the following to test with predefined input and run the code
if __name__ == "__main__":
    a = [2, 3]  # Predefined input list
    print(main(a))  # Print the sum of the list

# For submission, comment out lines 6-9 and uncomment lines 13-14 to test against the defined test cases
# Uncomment below to submit the solution with dynamic input
# if __name__ == "__main__":
#     print(main(input()))  # Read input and print the sum`;

const defaultCode2 = `def main(num):
    # Check if the number is a palindrome
    str_num = str(num)
    return str_num == str_num[::-1]

# Use the following to test with a predefined input (uncomment to test)
# if __name__ == "__main__":
#     a = -121  # Predefined input number
#     print(main(a))  # Check if the number is a palindrome

# Use this for submitting the solution and running against test cases
if __name__ == "__main__":
    print(main(input()))  # Read input and check if it's a palindrome
`;

const CodeEditor: React.FC<CodeEditorProps> = ({
  solutions,
  setShowConfetti,
  fetchSubmittedSolutions,
  selectedQuestion,
  setTestResults,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const [gifURL, setGifUrl] = useState("");
  const [errmodal, setErrModal] = useState(false);
  const [errbody, setErrBody] = useState("");
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
      setErrModal(true);
      setErrBody("Please write some code before submitting.");
      return;
    }
    if (!questionId) {
      setErrModal(true);
      setErrBody("Please select a question before submitting.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setErrModal(true);
      setErrBody("Please login to submit your solution.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/submit-solution`,
        // "http://localhost:8000/submit-solution",
        {
          question_id: selectedQuestion?.id,
          provider_id: user.id,
          code: code,
          language: "python",
          version: "3.10.0",
        }
      );
      fetchSubmittedSolutions();
      if (response.status === 200) {
        setTestResults(response.data);
        const allTestsPassed = response.data.every(
          (test: { pass: boolean }) => test.pass === true
        );

        if (allTestsPassed) {
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 5000);
        }
      } else {
        setErrModal(true);
        setErrBody("An error occurred while submitting your solution.");
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
      setErrModal(true);
      setErrBody("An error occurred while submitting your solution.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" relative flex flex-col h-full">
      <Card className="bg-zinc-900 border-zinc-800 flex flex-col flex-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-base">Code Editor</CardTitle>
          <AlertModal
            errmodal={errmodal}
            setErrModal={setErrModal}
            body={errbody}
          />
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
                {submitting ? (
                  <Loader className="h-5 w-5" />
                ) : (
                  <Save className="h-5 w-5 mr-2" />
                )}
                {submitting ? "Submitting..." : "Submit"}
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
            defaultValue={defaultCode}
            value={
              solutions.find((s) => s.question_id === selectedQuestion?.id)
                ?.submitted_code ||
              (selectedQuestion?.id == 1
                ? defaultCode1
                : selectedQuestion?.id == 2
                ? defaultCode2
                : defaultCode)
            }
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
