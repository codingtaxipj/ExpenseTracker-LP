import React from "react";

import { amountFloat } from "../utilityFilter";
import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import TH from "./TH";
import TD from "./TD";
import { cardBgv2 } from "@/global/style";
import { cn } from "@/lib/utils";

const IncomeExpenseTable = ({ data }) => {
  return (
    <>
      <Flexrow className={cn("overflow-hidden", cardBgv2)}>
        <table className="w-full">
          <thead>
            <tr className="bg-dark-a5 text-slate-a1">
              <TH className="px-5">
                <Icons.checkCircle className={`text-inc-a3`} />
              </TH>
              <TH className="pr-12">Month</TH>
              <TH className="pr-8">Income</TH>
              <TH className="pr-8">Expense</TH>
              <TH className="pr-8">%</TH>
              <TH className="px-5"></TH>
            </tr>
          </thead>
          <tbody className="text-slate-a3 border-0">
            {data.map((b) => (
              <>
                <tr className="text-14px" key={b.id}>
                  <TD className="px-5">
                    <span className="text-14px">
                      <Icons.checkCircle className={`text-inc-a3`} />
                    </span>
                  </TD>
                  <TD className="">
                    {" "}
                    <span>{b.month}</span>
                  </TD>
                  <TD className="">
                    {b.income == 0 ? (
                      <span className="text-slate-a7"> --/-- </span>
                    ) : (
                      <span> {amountFloat(b.income)} </span>
                    )}
                  </TD>
                  <TD className="">
                    {b.expense == 0 ? (
                      <span className="text-slate-a7"> --/-- </span>
                    ) : (
                      <span> {amountFloat(b.expense)} </span>
                    )}
                  </TD>
                  <TD
                    className={`${b.percent < 0 && "text-gg"} ${b.percent > 0 && "text-rr"} `}
                  >
                    {b.percent == 0 ? (
                      <span className="text-slate-a7"> --/-- </span>
                    ) : (
                      <span> {b.percent}% </span>
                    )}
                  </TD>
                  <TD className={`${b.percent <= 0 ? "text-gg" : "text-rr"} `}>
                    <span className="text-12px">
                      {b.percent < 0 && <Icons.graphdown />}
                      {b.percent > 0 && <Icons.graphup />}
                    </span>
                  </TD>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </Flexrow>
    </>
  );
};

export default IncomeExpenseTable;
