"use client";
import { Button } from "@/components/ui/button";
import { Play, Save, Settings } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-3 pl-4 border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <code className="text-xl font-bold text-white">{"</>"}</code>
        <span className="text-xl font-bold text-white">CodeQuest</span>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon">
          <Play className="h-5 w-5" />
        </Button>
        <Button size="icon">
          <Save className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
