import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Question {
  id: number;
  title: string;
  content: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "Question 1",
    content:
      "Explain the difference between var, let, and const in JavaScript.",
  },
  {
    id: 2,
    title: "Question 2",
    content: "What is a closure in JavaScript?",
  },
  {
    id: 3,
    title: "Question 3",
    content: "How does async/await work in JavaScript?",
  },
];
const Questions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[40vh] pr-4">
          <div className="space-y-4">
            {questions.map((question) => (
              <Card
                key={question.id}
                className={`bg-zinc-800 border-zinc-700 cursor-pointer transition-colors hover:bg-zinc-700  ${
                  selectedQuestion?.id === question.id ? "border-blue-500" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    {question.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-zinc-300 text-sm">
                  {question.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Questions;
