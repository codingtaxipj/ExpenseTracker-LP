import { cn } from "@/lib/utils";
import React from "react";
const TH = ({ children, className = "" }) => {
  return (
    <th
      className={cn("text-14px px-1.5 py-2.5 text-left font-medium", className)}
    >
      {children}
    </th>
  );
};

export default TH;
