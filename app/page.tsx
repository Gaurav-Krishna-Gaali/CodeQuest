"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import Questions from "./Questions";
import TestCases from "./TestCases";

const Page = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr,1fr]  gap-4 p-4 overflow-hidden">
        <CodeEditor />
        <div className="space-y-4">
          <Questions
            setSelectedQuestion={setSelectedQuestion}
            selectedQuestion={selectedQuestion}
          />
          <TestCases
            setSelectedQuestion={setSelectedQuestion}
            selectedQuestion={selectedQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
