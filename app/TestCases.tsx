import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestResult, TestCase } from "@/types/types";
import React, { useState } from "react";

const initialTestCases: TestCase[] = [
  {
    id: 1,
    input: "[1, 2, 3]",
    expected_output: "6",
    status: "success",
  },
  {
    id: 2,
    input: "[4, 5, 6]",
    expected_output: "15",
    status: "error",
    actual_output: "12",
  },
  {
    id: 3,
    input: "[7, 8, 9]",
    expected_output: "15",
    actual_output: "24",
    status: "pending",
  },
];

const TestCases = ({ testResults }: { testResults: TestResult[] }) => {
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);

  React.useEffect(() => {
    if (testResults) {
      const updatedTestCases: TestCase[] = testResults.map((testCase) => ({
        id: testCase.id,
        input: testCase.input,
        expected_output: testCase.expected_output,
        actual_output: testCase.actual_output,
        status:
          testCase.pass == true
            ? "success"
            : testCase.pass == false
            ? "error"
            : "pending",
      }));
      setTestCases(updatedTestCases);
    }
  }, [testResults]);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white text-lg">Test Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="pr-2">
          <table className="w-full text-sm text-left text-zinc-400">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-700">
                <th className="py-2 px-2">#</th>
                <th className="py-2 px-2">Input</th>
                <th className="py-2 px-2">Expected</th>
                <th className="py-2 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {testCases.map((testCase) => (
                <tr
                  key={testCase.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800"
                >
                  <td className="py-2 px-2">{testCase.id}</td>
                  <td className="py-2 px-2">{testCase.input}</td>
                  <td className="py-2 px-2">{testCase.expected_output}</td>
                  <td className="py-2 px-2">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        testCase.status === "success"
                          ? "bg-green-600 text-green-100"
                          : testCase.status === "error"
                          ? "bg-red-600 text-red-100"
                          : "bg-yellow-600 text-yellow-100"
                      }`}
                    >
                      {testCase.status}
                    </span>
                    {testCase.status === "error" && (
                      <div className="text-xs mt-1 text-red-400">
                        Actual: {testCase.actual_output}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TestCases;
