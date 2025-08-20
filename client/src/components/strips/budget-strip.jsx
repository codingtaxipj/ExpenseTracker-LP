import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import { amountInteger } from "../utilityFilter";
import TooltipStrip from "./tooltip-strip";
import BudgetPop from "../budget/budget-pop";
import UseBudgetConfig from "@/hooks/useBudgetConfig";
import EButton from "../buttons/eButton";
import HorizontalDivider from "./horizontal-divider";

const BudgetStrip = () => {
  const { ActiveBudget } = UseBudgetConfig();
  const budget = ActiveBudget === null ? null : ActiveBudget.amount;
  return (
    <>
      <Flexrow className="w-max items-center font-medium gap-1.5">
        <span className="mr-1.5">
          <Icons.calc className={`text-budget`} />
        </span>

        <span>
          {budget
            ? "Your Monthly Budget is"
            : "No Monthly Budget is Exist"}{" "}
        </span>
        <HorizontalDivider className={"h-3.5"} />
        {/** NOTE - if no budget exists*/}
        {!budget && (
          <>
            <BudgetPop isSet>
              <EButton as="div" isTextIcon setBudget />
            </BudgetPop>
          </>
        )}
        {/** NOTE - if  budget exist */}
        {budget && (
          <>
            <Icons.rupee className="!text-14px" />
            <h4>{amountInteger(budget)}</h4>
             <HorizontalDivider className={"h-3.5"} />

            <BudgetPop activeBudget={ActiveBudget} isEdit>
              <TooltipStrip content="Edit Current Budget">
                <EButton as="div" isIcon editIcon className={"bg-budget"} />
              </TooltipStrip>
            </BudgetPop>
            <BudgetPop isNew>
              <TooltipStrip content="Set New Budget">
                <EButton as="div" isIcon className={"bg-budget"}>
                  <Icons.calnew />
                </EButton>
              </TooltipStrip>
            </BudgetPop>
            <TooltipStrip content="Go To Budget">
              <EButton as="div" isIcon gotoIcon className={"bg-budget"} />
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
