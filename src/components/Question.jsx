import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card.jsx";
const questions = [
    {
        id: 1,
        title: "Question 1",
        description: "Explain the difference between var, let, and const in JavaScript.",
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
];
const Questions = () => {
    return (<Card className="h-full rounded-none border-x-0 border-t-0">
      <CardHeader className="border-b px-6 py-4">
        <CardTitle>Questions</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {questions.map((question) => (<Card key={question.id} className="bg-muted/50">
              <CardHeader className="py-4">
                <CardTitle className="text-base">{question.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0 text-md text-muted-foreground">
                {question.description}
              </CardContent>
            </Card>))}
        </div>
      </CardContent>
    </Card>);
};
export default Questions;
