import { Button } from "@/components/ui/button.jsx";
import { Code2, Play, Settings } from "lucide-react";
const Header = () => {
    return (<header className="flex h-16 items-center jsutify-between border-b">
      <div className="flex items-center gap-2">
        <Code2 className="w-6 h-6"/>
        <span className="text-2xl font-semibold">DevCode</span>
      </div>
      <div className="
      ">
        <Button variant="ghost" size="icon">
          <Play className="h-5 w-5"/>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5"/>
        </Button>
      </div>
    </header>);
};
export default Header;
