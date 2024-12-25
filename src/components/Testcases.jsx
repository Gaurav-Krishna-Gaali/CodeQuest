import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card.jsx";
const testCases = [
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
    return (<Card className="h-full rounded-none border-x-0 border-b-0">
      <CardHeader className="border-b px-6 py-4">
        <CardTitle>Test Cases</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testCases.map((testCase) => (<Card key={testCase.id} className="bg-muted/50">
              <CardContent className="p-4 ">
                <div className="space-y-2">
                  <div className="">
                    <span className="font-medium">Input: </span>
                    {testCase.input}
                  </div>
                  <div className="">
                    <span className="font-medium">Expected Output: </span>
                    {testCase.expectedOutput}
                  </div>
                  <Button className="w-full">Run</Button>
                </div>
              </CardContent>
            </Card>))}
        </div>
      </CardContent>
    </Card>);
};
export default TestCases;
