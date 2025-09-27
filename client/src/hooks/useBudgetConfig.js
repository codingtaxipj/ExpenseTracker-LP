import { ArrayCheck } from "@/components/utility";
import { percentSigned, percentUnSigned } from "@/components/utilityFilter";
import {
  CurrentMonth,
  CurrentYear,
  getMonthName,
} from "@/utilities/calander-utility";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useBudgetConfig = () => {
  const {
    BudgetData,
    BudgetLoading,
    BudgetError,
    BudgetInsertLoading,
    BudgetInsertError,
  } = useSelector((state) => state.budget);

  const Budget = useMemo(() => ArrayCheck(BudgetData), [BudgetData]);

  //NOTE - gets the active budget data of user
  const ActiveBudget = useMemo(() => {
    if (!Budget) return null;
    // find data of current year
    const currentYear = Budget.find((b) => b.year === CurrentYear()) || null;
    // if data is not there return null
    if (!currentYear) return null;
    // if data is present then gets the values
    const { userID, year, budgetList } = currentYear;
    // if budget list is empty then return null
    const bList = ArrayCheck(budgetList);
    if (!bList) return null;
    // if budget list exists then finds the active budget
    const list = bList.filter((b) => b.month <= CurrentMonth());
    const latest = list.length > 0 ? list[list.length - 1] : list[0];

    return {
      userID,
      year,
      month: latest.month,
      amount: latest.budget,
    };
  }, [Budget]);

  const budgetList = useMemo(() => {
    if (!Budget) return null;
    const dd = Budget.flatMap(({ year, budgetList }) =>
      (budgetList ?? []).map((bd) => ({
        year,
        month: bd.month,
        budget: bd.budget,
      })),
    );
    return dd.reverse();
  }, [Budget]);

  //NOTE - creates arr objs of year wise each month budget list and year total
  const BudgetByMonth = useMemo(() => {
    // checks redux state var
   
    if (!Budget) return null;

    return Budget.map((data) => {
      // gets the values from each array obj
      const { year, budgetList } = data;
      // gets the array list of budget according to each month
      const list = createBudgetArray(budgetList);
      // gets total budget of year based on above array list
      const totalBudget = list.reduce((sum, b) => sum + b.budget, 0);
      return {
        year,
        list,
        totalBudget,
      };
    });
  }, [Budget]);

  const getBudgetListOfYear = (list, year = CurrentYear()) =>
    list?.find((l) => l.year === year)?.list ?? [];
  const getTotalBudgetOfYear = (list, year = CurrentYear()) =>
    list?.find((l) => l.year === year)?.totalBudget ?? null;

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
    if (!checkedBudget || checkedExpense) return null;
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

//NOTE - creates the array list of budget according to each month of year
export const createBudgetArray = (list = []) => {
  const arr = [];
  let bud = null;

  for (let i = 0; i < 12; i++) {
    const match = list.find((b) => b.month === i);
    if (match) {
      bud = match.budget;
      arr.push({ month: i, budget: bud });
    } else if (bud !== null) {
      arr.push({ month: i, budget: bud });
    } else {
      arr.push({ month: i, budget: 0 });
    }
  }

  return arr;
};

export const getBudgetExpPercent = (b, e) => {
  if (b === 0) return percentUnSigned(0);
  const diff = e - b;
  const percent = (diff / b) * 100;
  return percentSigned(percent);
};
