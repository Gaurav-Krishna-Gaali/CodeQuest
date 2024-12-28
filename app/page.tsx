"use client";
import React from "react";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import Questions from "./Questions";
import TestCases from "./TestCases";

const page = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-4 p-4 overflow-hidden">
        <CodeEditor />
        <div className="space-y-4">
          <Questions />
          <TestCases />
        </div>
      </div>
    </div>
  );
};

export default page;
