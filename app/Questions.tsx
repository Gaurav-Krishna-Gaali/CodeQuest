import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Question {
  id: number;
  title: string;
  content: string;
}

const questions_s: Question[] = [
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
  {
    id: 4,
    title: "Question 4",
    content: "What are the key features of React?",
  },
  {
    id: 5,
    title: "Question 5",
    content: "Explain the Virtual DOM and how it differs from the Real DOM.",
  },
  {
    id: 6,
    title: "Question 6",
    content: "What is the difference between state and props in React?",
  },
  {
    id: 7,
    title: "Question 7",
    content: "How does event delegation work in JavaScript?",
  },
  {
    id: 8,
    title: "Question 8",
    content: "What are JavaScript Promises, and how do you use them?",
  },
  {
    id: 9,
    title: "Question 9",
    content: "What are the lifecycle methods in React, and when are they used?",
  },
  {
    id: 10,
    title: "Question 10",
    content: "What is the difference between SQL and NoSQL databases?",
  },
  {
    id: 11,
    title: "Question 11",
    content: "What is CORS, and why is it important?",
  },
  {
    id: 12,
    title: "Question 12",
    content: "Explain the concept of hoisting in JavaScript.",
  },
  {
    id: 13,
    title: "Question 13",
    content: "What are higher-order functions in JavaScript?",
  },
  {
    id: 14,
    title: "Question 14",
    content: "What is the significance of keys in React lists?",
  },
  {
    id: 15,
    title: "Question 15",
    content: "What are WebSockets, and how do they differ from HTTP?",
  },
  {
    id: 16,
    title: "Question 16",
    content: "What is the purpose of Redux in state management?",
  },
  {
    id: 17,
    title: "Question 17",
    content:
      "What is the difference between synchronous and asynchronous programming?",
  },
  {
    id: 18,
    title: "Question 18",
    content:
      "What are service workers, and how are they used in Progressive Web Apps?",
  },
  {
    id: 19,
    title: "Question 19",
    content: "What is memoization, and how does it improve performance?",
  },
  {
    id: 20,
    title: "Question 20",
    content: "What are the differences between HTTP/1.1 and HTTP/2?",
  },
];

const Questions = ({ selectedQuestion, setSelectedQuestion }) => {
  const [questions, setQuestions] = useState<Question | null>([]);

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion((prev) => (prev?.id === question.id ? null : question));
  };

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        console.log(data);
        setQuestions(data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        // setLoading(false);
      }
    }

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
            {questions.map((question) => (
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
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Questions;
