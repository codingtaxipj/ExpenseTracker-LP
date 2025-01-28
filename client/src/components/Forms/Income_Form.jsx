import Income_Expense_Form from "./Income_Expense_Form";
import { navVars } from "../../global/global-variables";
const IncomeForm = () => {
  return (
    <>
      <div className="bg-white flex w-[70%] grow flex-col items-center justify-center rounded-[20px] px-[4rem] py-[2.5rem]">
        <Income_Expense_Form formToDisplay={navVars.ADD_INCOME} />
      </div>
    </>
  );
};

export default IncomeForm;
