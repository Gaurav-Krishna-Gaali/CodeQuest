"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import Questions from "./Questions";
import TestCases from "./TestCases";

const Page = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [testResults, setTestResults] = useState<any[]>([]);

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

  useEffect(() => {
    if (selectedQuestion != null) {
      fetchTestCases(selectedQuestion.id);
    }
  }, [selectedQuestion]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr,1fr]  gap-4 p-4 overflow-hidden">
        <CodeEditor
          selectedQuestion={selectedQuestion}
          testResults={testResults}
          setTestResults={setTestResults}
        />
        <div className="space-y-4">
          <Questions
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
