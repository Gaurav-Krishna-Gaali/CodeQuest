import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleCheck, CircleX } from "lucide-react";

interface Question {
  id: number;
  title: string;
  description: string;
}

interface Solution {
  user_id: number;
  question_id: number;
  is_correct: boolean;
}

const questions_s: Question[] = [
  {
    id: 1,
    title: "Question 1",
    description:
      "Explain the difference between var, let, and const in JavaScript.",
  },
  {
    id: 2,
    title: "Question 2",
    description: "What is a closure in JavaScript?",
  },
  {
    id: 3,
    title: "Question 3",
    description: "How does async/await work in JavaScript?",
  },
  {
    id: 4,
    title: "Question 4",
    description: "What are the key features of React?",
  },
  {
    id: 5,
    title: "Question 5",
    description:
      "Explain the Virtual DOM and how it differs from the Real DOM.",
  },
  {
    id: 6,
    title: "Question 6",
    description: "What is the difference between state and props in React?",
  },
  {
    id: 7,
    title: "Question 7",
    description: "How does event delegation work in JavaScript?",
  },
  {
    id: 8,
    title: "Question 8",
    description: "What are JavaScript Promises, and how do you use them?",
  },
  {
    id: 9,
    title: "Question 9",
    description:
      "What are the lifecycle methods in React, and when are they used?",
  },
  {
    id: 10,
    title: "Question 10",
    description: "What is the difference between SQL and NoSQL databases?",
  },
  {
    id: 11,
    title: "Question 11",
    description: "What is CORS, and why is it important?",
  },
  {
    id: 12,
    title: "Question 12",
    description: "Explain the concept of hoisting in JavaScript.",
  },
  {
    id: 13,
    title: "Question 13",
    description: "What are higher-order functions in JavaScript?",
  },
  {
    id: 14,
    title: "Question 14",
    description: "What is the significance of keys in React lists?",
  },
  {
    id: 15,
    title: "Question 15",
    description: "What are WebSockets, and how do they differ from HTTP?",
  },
  {
    id: 16,
    title: "Question 16",
    description: "What is the purpose of Redux in state management?",
  },
  {
    id: 17,
    title: "Question 17",
    description:
      "What is the difference between synchronous and asynchronous programming?",
  },
  {
    id: 18,
    title: "Question 18",
    description:
      "What are service workers, and how are they used in Progressive Web Apps?",
  },
  {
    id: 19,
    title: "Question 19",
    description: "What is memoization, and how does it improve performance?",
  },
  {
    id: 20,
    title: "Question 20",
    description: "What are the differences between HTTP/1.1 and HTTP/2?",
  },
];

const Questions = ({ solutions, selectedQuestion, setSelectedQuestion }) => {
  const [questions, setQuestions] = useState<Question | null>([]);

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion((prev) => (prev?.id === question.id ? null : question));
  };

  const getSolutionStatus = (questionId: number) => {
    const solution = solutions.find((s) => s.question_id === questionId);
    if (solution) {
      return solution.is_correct;
    }
    return null; // Unanswered
  };
  async function fetchQuestions() {
    try {
      const response = await fetch("http://localhost:8000/questions");
      const data = await response.json();
      console.log(data);
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
  useEffect(() => {
    fetchQuestions();
  }, [selectedQuestion]);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white text-lg">Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className=" h-[50vh] pr-4 ">
          <div className="space-y-4">
            {questions.map((question) => {
              const solutionStatus = getSolutionStatus(question.id);
              return (
                <Card
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  className={`relative bg-zinc-800 border-zinc-700 cursor-pointer transition-all hover:bg-zinc-700 ${
                    selectedQuestion?.id === question.id
                      ? "border-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg"
                      : ""
                  }`}
                  role="button"
                  aria-pressed={selectedQuestion?.id === question.id}
                >
                  {selectedQuestion?.id === question.id && (
                    <div className="absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 blur-md opacity-40 pointer-events-none"></div>
                  )}
                  <div className="relative z-10">
                    <CardHeader>
                      <CardTitle
                        className={`text-base transition-all ${
                          selectedQuestion?.id === question.id
                            ? "text-white font-bold"
                            : "text-zinc-300"
                        }`}
                      >
                        {question.title}
                      </CardTitle>
                    </CardHeader>
                    {selectedQuestion?.id === question.id && (
                      <CardContent className="text-zinc-100 text-sm">
                        {question.description}
                      </CardContent>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    {solutionStatus === true ? (
                      <span className="text-green-500">
                        <CircleCheck />
                      </span> // Green check for correct
                    ) : solutionStatus === false ? (
                      <span className="text-red-500">
                        <CircleX />
                      </span> // Red cross for incorrect
                    ) : (
                      <span className="text-yellow-500"></span> // Yellow dash for unanswered
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Questions;
