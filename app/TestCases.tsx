import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status?: "pending" | "success" | "error";
}

const initialTestCases: TestCase[] = [
  {
    id: 1,
    input: "[1, 2, 3]",
    expectedOutput: "6",
  },
  {
    id: 2,
    input: "[4, 5, 6]",
    expectedOutput: "15",
  },
  {
    id: 3,
    input: "[7, 8, 9]",
    expectedOutput: "24",
  },
];

const TestCases = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">TestCases</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[40vh] pr-4">
          <div className="space-y-4">
            {testCases.map((testCase) => (
              <Card key={testCase.id} className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-md text-white">
                    Test Case {testCase.id}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="">
                    <p className="text-md text-zinc-400">Input:</p>
                    <p className="text-md text-zinc-400">{testCase.input}</p>
                  </div>
                  <div className="">
                    <p className="text-md text-zinc-400">Excepted Output:</p>
                    <p className="text-md text-zinc-400">{testCase.input}</p>
                  </div>
                  {testCase.status && (
                    <div>
                      <p className="text-sm text-zinc-400">Actual Output:</p>
                      <p
                        className={`text-sm ${
                          testCase.status === "success"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {testCase.actualOutput}
                      </p>
                    </div>
                  )}
                  <div
                    className={`text-sm font-semibold ${
                      testCase.status === "success"
                        ? "text-green-400"
                        : testCase.status === "error"
                        ? "text-red-400"
                        : "text-zinc-400"
                    }`}
                  >
                    Status: {testCase.status || "Not run"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TestCases;
