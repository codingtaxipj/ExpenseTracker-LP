import { useNavigate } from "react-router-dom";
import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import { amountInteger } from "../utilityFilter";
import TooltipStrip from "./tooltip-strip";
import { PATH } from "@/router/routerConfig";
import VerticalLine from "../separator/vertical-line";
import GotoIconBtn from "../buttons/icon-only-btns/goto-icon-btn";
import BudgetPop from "../budget/budget-pop";
import UseBudgetConfig from "@/hooks/useBudgetConfig";

const BudgetStrip = () => {
  const navigate = useNavigate();
  const { ActiveBudget } = UseBudgetConfig();
  const budget = ActiveBudget === null ? null : ActiveBudget.amount;
  return (
    <>
      <Flexrow className="w-max items-center gap-2">
        <span className="mr-1.5">
          <Icons.calc className={`text-budget`} />
        </span>

        <h4>
          {budget
            ? "Your Monthly Budget is"
            : "No Monthly Budget is Exist"}{" "}
        </h4>
        <VerticalLine />
        {/** NOTE - if no budget exists*/}
        {!budget && (
          <>
            <BudgetPop isSet>
              <div className="bg-budget flex cursor-pointer items-center gap-1.5 rounded-md px-5 py-1">
                <span className="text-16">
                  <Icons.calnew />
                </span>
                <span className="text-14"> Set Budget</span>
              </div>
            </BudgetPop>
          </>
        )}
        {/** NOTE - if  budget exist */}
        {budget && (
          <>
            <Icons.rupee />
            <h4>{amountInteger(budget)}</h4>
            <VerticalLine />

            <BudgetPop activeBudget={ActiveBudget} isEdit>
              <TooltipStrip content="Edit Current Budget">
                <div className="bg-budget flex cursor-pointer items-center gap-1.5 rounded-sm p-1.25">
                  <span className="text-16">
                    <Icons.pencil />
                  </span>
                </div>
              </TooltipStrip>
            </BudgetPop>

            <BudgetPop isNew>
              <TooltipStrip content="Set New Budget">
                <div className="bg-budget flex cursor-pointer items-center gap-1.5 rounded-sm p-1.25">
                  <span className="text-16">
                    <Icons.calnew />
                  </span>
                </div>
              </TooltipStrip>
            </BudgetPop>
            <TooltipStrip content="Go To Budget">
              <GotoIconBtn
                onClick={() => navigate(PATH.budget)}
                className={"bg-budget"}
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
