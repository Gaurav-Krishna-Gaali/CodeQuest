import CodeEditor from "./components/CodeEditor.jsx";
import Header from "./components/Header.jsx";
import Questions from "./components/Question.jsx";
import TestCases from "./components/Testcases.jsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable.jsx";

function App() {
  return (
    <div className="flex h-screen flex-col bg-gray-800">
      <Header />
      <main className="flex-1 ">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={70} minSize={30}>
            <div className="h-[calc(70vh-4rem)]">
              <CodeEditor />
            </div>
            <div className="h-[calc(30vh)]">
              <TestCases />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <Questions />
            <TestCases />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}

export default App;
