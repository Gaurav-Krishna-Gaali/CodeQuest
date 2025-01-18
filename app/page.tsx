"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import Questions from "./Questions";
import TestCases from "./TestCases";
import { supabase } from "../utils/supabase/supabase";
import Confetti from "react-confetti";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [showconfetti, setShowConfetti] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const fetchTestCases = async (questionId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/questions/${questionId}/test_cases`
      );
      const data = await response.json();
      setTestResults(data);
    } catch (error) {
      console.error("Error fetching test cases:", error);
    }
  };

  const fetchSubmittedSolutions = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    if (user) {
      try {
        const response = await fetch(
          `http://localhost:8000/solutions/${user.id}`
        );
        const data = await response.json();
        setSolutions(data);
      } catch (error) {
        console.error("Error fetching test cases:", error);
      }
    }
  };

  useEffect(() => {
    fetchSubmittedSolutions();
    if (selectedQuestion != null) {
      fetchTestCases(selectedQuestion.id);
    }
  }, [selectedQuestion]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {showconfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={600}
          recycle={false}
          run={showconfetti}
        />
      )}
      <Header>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="text-white  px-4 py-2 rounded"
                onClick={() => setIsSheetOpen(true)}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              onOpenChange={setIsSheetOpen}
              open={isSheetOpen}
              className="bg-black text-white border-zinc-800 "
            >
              <SheetHeader>
                <SheetTitle className="text-white">
                  Questions and Test Cases
                </SheetTitle>
                <SheetDescription>
                  Manage questions and view test case results here.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <Questions
                  solutions={solutions}
                  setSelectedQuestion={setSelectedQuestion}
                  selectedQuestion={selectedQuestion}
                />
                <TestCases
                  testResults={testResults}
                  selectedQuestion={selectedQuestion}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Header>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr,1fr]  gap-4 p-4  ">
        <CodeEditor
          solutions={solutions}
          setShowConfetti={setShowConfetti}
          fetchSubmittedSolutions={fetchSubmittedSolutions}
          selectedQuestion={selectedQuestion}
          testResults={testResults}
          setTestResults={setTestResults}
        />
        <div className="space-y-4 hidden lg:block">
          <Questions
            solutions={solutions}
            setSelectedQuestion={setSelectedQuestion}
            selectedQuestion={selectedQuestion}
          />
          <TestCases
            testResults={testResults}
            selectedQuestion={selectedQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
