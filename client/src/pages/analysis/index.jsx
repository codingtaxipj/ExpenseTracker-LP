import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
              <button className="px-2 text-sm">Analysis Of Year</button>
              <div>
                <Select>
                  <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="w-40">
                    <SelectItem value="2024">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>next</div>
            <div>next</div>
            <div>next</div>
            <div>next</div>
            <div>next</div>
            <div>next</div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
