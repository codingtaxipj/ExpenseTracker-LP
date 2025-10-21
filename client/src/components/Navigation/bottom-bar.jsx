import Flexrow from "../section/flexrow";
import VerticalDevider from "../strips/vertical-devider";
import { PATH } from "@/router/routerConfig";
import { cn } from "@/lib/utils";
import { baseBtn, Btn_text } from "@/global/style";
import { Icons } from "../icons";
import { useNavigate } from "react-router-dom";

export const BudgetBarIndicator = () => {
  return (
    <Flexrow className={"items-center gap-2"}>
      <span>Rs 5000</span>
      <VerticalDevider />
      <span>Monthly Budget</span>
      <div className="h-1.5 w-[25%] rounded-md bg-amber-300"></div>
      <span>Remaining Rs 200</span>
    </Flexrow>
  );
};

export const AddExp = () => {
  const navigate = useNavigate();
  return (
    <button
      className={cn(baseBtn, Btn_text, "text-slate-a1")}
      onClick={() => navigate(PATH.addExpense)}
    >
      <Icons.add_plus className="text-18px" />
      <span className="text-14px"> New Expense</span>
    </button>
  );
};
export const AddInc = () => {
  const navigate = useNavigate();
  return (
    <button
      className={cn(baseBtn, Btn_text, "text-slate-a1")}
      onClick={() => navigate(PATH.addIncome)}
    >
      <Icons.add_plus className="text-18px" />
      <span className="text-14px"> New Income</span>
    </button>
  );
};
