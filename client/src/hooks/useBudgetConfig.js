import { ArrayCheck } from "@/components/utility";
import { percentSigned, percentUnSigned } from "@/components/utilityFilter";
import { getMonthName, CurrentYear } from "@/utilities/calander-utility";

import { useSelector } from "react-redux";
import {
  selectBudget,
  selectActiveBudget,
  selectBudgetByMonth,
  selectBudgetList,
} from "@/redux/slices/budget-slice";

const useBudgetConfig = () => {
  const { BudgetLoading, BudgetError, BudgetInsertLoading, BudgetInsertError } =
    useSelector((state) => state.budget);
  const Budget = useSelector(selectBudget);
  const ActiveBudget = useSelector(selectActiveBudget);
  const BudgetByMonth = useSelector(selectBudgetByMonth);
  const budgetList = useSelector(selectBudgetList);

  const getBudgetListOfYear = (year = CurrentYear()) =>
    BudgetByMonth?.find((l) => l.year === year)?.list ?? [];

  const getTotalBudgetOfYear = (year = CurrentYear()) =>
    BudgetByMonth?.find((l) => l.year === year)?.totalBudget ?? 0;

  //NOTE - creates a group of budget in month range
  const createBudgetRange = (data) => {
    const checkedData = ArrayCheck(data);
    if (!checkedData) return null;
    const result = [];
    let start = checkedData[0].month;
    let currentBudget = checkedData[0].budget;
    for (let i = 1; i < checkedData.length; i++) {
      if (checkedData[i].budget !== currentBudget) {
        result.push({
          start,
          end: checkedData[i - 1].month,
          budget: currentBudget,
        });

        start = checkedData[i].month;
        currentBudget = checkedData[i].budget;
      }
    }
    // Push the last group
    result.push({
      start,
      end: checkedData[checkedData.length - 1].month,
      budget: currentBudget,
    });

    return result;
  };

  const createBudgetWithExpense = (budget, expense) => {
    const checkedBudget = ArrayCheck(budget);
    const checkedExpense = ArrayCheck(expense);
    if (!checkedBudget || !checkedExpense) return null;
    const arr = [];
    for (let i = 0; i < 12; i++) {
      let b =
        checkedBudget.length <= 0
          ? 0
          : (checkedBudget?.find((b) => b.month === i)?.budget ?? 0);
      let e = checkedExpense?.find((e) => e.month === i)?.total ?? 0;

      arr.push({
        id: i,
        month: getMonthName(i, "MMMM"),
        budget: b,
        expense: e,
        percent: e == 0 || b == 0 ? "00.00" : getBudgetExpPercent(b, e),
      });
    }

    return arr;
  };

  return {
    Budget,
    ActiveBudget,
    BudgetByMonth,
    budgetList,
    getBudgetListOfYear,
    createBudgetRange,
    createBudgetWithExpense,
    getTotalBudgetOfYear,
    BudgetLoading,
    BudgetError,
    BudgetInsertLoading,
    BudgetInsertError,
  };
};

export default useBudgetConfig;

export const getBudgetExpPercent = (b, e) => {
  if (b === 0) return percentUnSigned(0);
  const diff = e - b;
  const percent = (diff / b) * 100;
  return percentSigned(percent);
};
