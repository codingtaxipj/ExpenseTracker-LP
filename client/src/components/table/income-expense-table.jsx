import React from "react";

import { amountFloat } from "../utilityFilter";
import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import TH from "./TH";
import TD from "./TD";

const IncomeExpenseTable = ({ data }) => {
  return (
    <>
      <Flexrow>
        <div className="shadow-shadowBlack border-br1 w-full cursor-default overflow-hidden rounded-md border shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gradBot">
                <TH className="px-5">
                  <Icons.checkCircle className={`text-inc`} />
                </TH>
                <TH className="pr-12">Month</TH>
                <TH className="pr-8">Income</TH>
                <TH className="pr-8">Expense</TH>
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
                        <Icons.checkCircle className={`text-inc`} />
                      </span>
                    </TD>
                    <TD className="h-max">
                      {" "}
                      <span>{b.month}</span>
                    </TD>
                    <TD className="h-max">
                      {b.income == 0 ? (
                        <span className="text-91"> --/-- </span>
                      ) : (
                        <span> {amountFloat(b.income)} </span>
                      )}
                    </TD>
                    <TD className="h-max">
                      {b.expense == 0 ? (
                        <span className="text-91"> --/-- </span>
                      ) : (
                        <span> {amountFloat(b.expense)} </span>
                      )}
                    </TD>
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

export default IncomeExpenseTable;
