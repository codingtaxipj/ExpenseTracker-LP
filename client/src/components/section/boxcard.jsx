import { cn } from "@/lib/utils";
import React from "react";

const Boxcard = ({ className, children }) => {
  return (
    <div
      className={cn(
        "shadow-shadowBlack border-br1 bg-gradTop2 flex rounded-lg border px-12 py-10 text-white shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Boxcard;
