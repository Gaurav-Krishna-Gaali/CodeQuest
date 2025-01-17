"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import Questions from "./Questions";
import TestCases from "./TestCases";
import { supabase } from "../utils/supabase/supabase";
import Confetti from "react-confetti";

const Page = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [showconfetti, setShowConfetti] = useState(false);

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
      <Header />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr,1fr]  gap-4 p-4 overflow-hidden">
        <CodeEditor
          setShowConfetti={setShowConfetti}
          fetchSubmittedSolutions={fetchSubmittedSolutions}
          selectedQuestion={selectedQuestion}
          testResults={testResults}
          setTestResults={setTestResults}
        />
        <div className="space-y-4">
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
