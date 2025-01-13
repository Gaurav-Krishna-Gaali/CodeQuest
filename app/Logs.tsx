import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// const newLogs = [
//   `[${new Date().toISOString()}] Executing code...`,
//   `[${new Date().toISOString()}] Test case 1 executed`,
//   `[${new Date().toISOString()}] Test case 2 executed`,
//   `[${new Date().toISOString()}] Test case 3 executed`,
//   `[${new Date().toISOString()}] Execution completed`,
// ];
// setLogs((prevLogs) => [...prevLogs, ...newLogs]);

const Logs = ({ output }) => {
  return (
    <Card className="bg-black h-[calc(40vh-48px)] p-2 border-zinc-800 m-2 overflow-auto">
      <CardHeader className="py-2">
        <CardTitle className="text-white text-sm">Execution Logs</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(40vh-96px)] w-full px-4">
          <pre className="text-sm text-zinc-300 font-mono">
            {output}
            {/* {logs.join('\n')} */}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Logs;
