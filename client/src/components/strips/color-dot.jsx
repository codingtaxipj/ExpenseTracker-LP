import { cn } from "@/lib/utils";
import React from "react";

const ColorDot = ({ className }) => {
  return <span className={cn("mr-1 size-3 rounded-full", className)}></span>;
};

export default ColorDot;
