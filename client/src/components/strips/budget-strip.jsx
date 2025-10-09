import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import { amountInteger } from "../utilityFilter";
import TooltipStrip from "./tooltip-strip";

import UseBudgetConfig from "@/hooks/useBudgetConfig";

import HorizontalDivider from "./horizontal-divider";
import { cn } from "@/lib/utils";
import ExpButton from "../buttons/exp-button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router/routerConfig";

const BudgetStrip = () => {
  const { ActiveBudget } = UseBudgetConfig();
  const navigate = useNavigate();
  const budget = ActiveBudget === null ? null : ActiveBudget.amount;
  return (
    <>
      <Flexrow className="w-max items-center gap-2 font-medium">
        <Flexrow
          className={cn(
            "text-14px bg-dark-a5 shadow-dark-a1 mr-2 w-max items-center gap-2.5 px-5 py-2 shadow-md",

            "rounded-sm",
          )}
        >
          <Icons.calc className={`text-bud-a2`} />
          {budget && (
            <>
              {"Your Monthly Budget is"}
              <HorizontalDivider className={"h-3.5"} />
              <Flexrow className={"w-max items-center gap-1"}>
                <Icons.rupee className="!text-14px" />
                <h4>{amountInteger(budget)}</h4>
              </Flexrow>
            </>
          )}
          {!budget && <>{"No Monthly Budget is Exist"}</>}
        </Flexrow>

        {!budget && (
          <>
            <ExpButton as="div" setBudget_textbtn />
          </>
        )}

        {budget && (
          <>
            <ExpButton as="div" editBudget_iconbtn />
            <ExpButton as="div" newBudget_iconbtn />

            <TooltipStrip content="Go To Budget">
              <ExpButton
                as="div"
                gotoPage_iconbtn
                onClick={() => navigate(PATH.budget)}
                className={"bg-bud-a3 text-dark-a2"}
              />
            </TooltipStrip>
          </>
        )}
      </Flexrow>
    </>
  );
};

export default BudgetStrip;

{
  /* <TooltipStrip content="Edit Current Budget">
                <ExpButton isIcon btnfor="budget" label={<Icons.caledit />} />
              </TooltipStrip> */
}
