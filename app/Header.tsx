"use client";
import React from "react";
import Login from "./Login";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-3 pl-4 border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <code className="text-xl font-bold text-white">{"</>"}</code>
        <span className="text-xl font-bold text-white">CodeQuest</span>
      </div>
      <div className="flex items-center gap-2">
        <Login />
      </div>
    </header>
  );
};

export default Header;
