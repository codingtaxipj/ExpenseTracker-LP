import React from "react";

import {
  amountFloat,
  amountInteger,
  amountSignedFloat,
} from "../utilityFilter";
import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import TH from "./TH";
import TD from "./TD";
import { cn } from "@/lib/utils";
import { cardBgv2 } from "@/global/style";

export const ComboTable = ({ data, inBudgeting }) => {
  return (
    <>
      <Flexrow className={cn("overflow-hidden", cardBgv2,"bg-dark-a1.2")}>
        <table className="w-full">
          <thead>
            <tr className="bg-dark-a5 text-slate-a1">
              <TH className="w-0 px-5">
                <Icons.checkCircle
                  className={cn(
                    "text-14px",
                    inBudgeting ? "text-bud-a1" : "text-exp-a3",
                  )}
                />
              </TH>
              <TH className="pr-15">Month</TH>
              <TH className="pr-5">Budget</TH>
              <TH className="pr-5">Expense</TH>
              {inBudgeting && <TH className="pr-5">Difference</TH>}
              <TH className="pr-5">%</TH>
              <TH className="px-5"> </TH>
            </tr>
          </thead>
          <tbody className="text-slate-a3 border-0">
            {data.map((b) => (
              <>
                <tr className="text-14px" key={b.id}>
                  <TD className="px-5">
                    <Icons.checkCircle
                      className={cn(
                        "text-14px",
                        inBudgeting ? "text-bud-a1" : "text-exp-a3",
                      )}
                    />
                  </TD>
                  <TD className="">{b.month}</TD>
                  <TD className="">
                    {b.budget == 0 ? (
                      <span className="text-slate-a7"> --/-- </span>
                    ) : (
                      amountInteger(b.budget)
                    )}
                  </TD>
                  <TD className="">
                    {b.expense == 0 ? (
                      <span className="text-slate-a7"> --/-- </span>
                    ) : (
                      amountFloat(b.expense)
                    )}
                  </TD>
                  {inBudgeting && (
                    <>
                      <TD className="">
                        {b.budget == 0 ? (
                          <span className="text-slate-a7"> --/-- </span>
                        ) : (
                          <span
                            className={`${b.budget - b.expense < 0 ? "text-rr" : "text-gg"}`}
                          >
                            {amountSignedFloat(b.budget - b.expense)}
                          </span>
                        )}
                      </TD>
                    </>
                  )}
                  <TD
                    className={`${b.percent < 0 && "text-gg"} ${b.percent > 0 && "text-rr"} `}
                  >
                    {b.percent == 0 ? (
                      <span className="text-slate-a7"> --/-- </span>
                    ) : (
                      b.percent + " " + "%"
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


