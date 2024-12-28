"use client";
import React from "react";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import Questions from "./Questions";

const page = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr,500px] gap-4 p-4 overflow-hidden">
        <CodeEditor />
        <div className="space-y-4">
          <Questions />
        </div>
      </div>
    </div>
  );
};

export default page;
