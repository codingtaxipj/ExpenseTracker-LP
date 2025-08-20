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

const BudgetExpenseTable = ({ data, inBudgeting }) => {
  return (
    <>
      <Flexrow>
        <div className="shadow-shadowBlack border-br1 w-full cursor-default overflow-hidden rounded-md border shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gradBot">
                <TH className="w-0 px-5">
                  <Icons.checkCircle className={`text-exp`} />
                </TH>
                <TH className="pr-12">Month</TH>
                <TH className="pr-8">Budget</TH>
                <TH className="pr-8">Expense</TH>
                {inBudgeting && <TH>Difference</TH>}
                <TH className="pr-8">%</TH>
                <TH className="px-5"></TH>
              </tr>
            </thead>
            <tbody className="border-0">
              {data.map((b) => (
                <>
                  <tr className="bg-darkBlack text-14px font-medium" key={b.id}>
                    <TD className="h-max px-5">
                      <span className="text-14px">
                        <Icons.checkCircle className={`text-exp`} />
                      </span>
                    </TD>
                    <TD className="h-max">
                      {" "}
                      <span>{b.month}</span>
                    </TD>
                    <TD className="h-max">
                      {b.budget == 0 ? (
                        <span className="text-91"> --/-- </span>
                      ) : (
                        <span> {amountInteger(b.budget)} </span>
                      )}
                    </TD>
                    <TD className="h-max">
                      {b.expense == 0 ? (
                        <span className="text-91"> --/-- </span>
                      ) : (
                        <span> {amountFloat(b.expense)} </span>
                      )}
                    </TD>
                    {inBudgeting && (
                      <>
                        <TD>
                          {b.budget == 0 ? (
                            <span className="text-91"> --/-- </span>
                          ) : (
                            <span
                              className={`${b.budget - b.expense < 0 ? "text-rr" : "text-gg"}`}
                            >
                              {" "}
                              {amountSignedFloat(b.budget - b.expense)}{" "}
                            </span>
                          )}
                        </TD>
                      </>
                    )}
                    <TD
                      className={`${b.percent < 0 && "text-gg"} ${b.percent > 0 && "text-rr"} h-max`}
                    >
                      {b.percent == 0 ? (
                        <span className="text-91"> --/-- </span>
                      ) : (
                        <span> {b.percent}% </span>
                      )}
                    </TD>
                    <TD
                      className={`${b.percent <= 0 ? "text-gg" : "text-rr"} h-max`}
                    >
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
        </div>
      </Flexrow>
    </>
  );
};

export default BudgetExpenseTable;
