import React from "react";
import BaseBtn from "../base-btn";
import { Icons } from "@/components/icons";

const AddIncomeBtn = ({ ...props }) => {
  return (
    <BaseBtn {...props} className={"bg-inc"}>
      <span className="text-16px">
        <Icons.addCircle />
      </span>
      <span className="text-14px"> Add Income</span>
    </BaseBtn>
  );
};

export default AddIncomeBtn;
