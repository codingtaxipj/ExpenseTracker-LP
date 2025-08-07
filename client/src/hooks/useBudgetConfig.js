import { percentSigned, percentUnSigned } from "@/components/utilityFilter";
import {
  CurrentMonth,
  CurrentYear,
  getMonthName,
} from "@/utilities/calander-utility";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useBudgetConfig = () => {
  const BudgetData = useSelector((state) => state.budget.data);

  //NOTE - gets the active budget data of user
  const ActiveBudget = useMemo(() => {
    // checks redux state var
    if (!Array.isArray(BudgetData)) return null;
    // find data of current year
    const currentYear =
      BudgetData.find((b) => b.year === CurrentYear()) || null;
    // if data is not there return null
    if (!currentYear) return null;
    // if data is present then gets the values
    const { userID, year, budgetList } = currentYear;
    // if budget list is empty then return null
    if (!budgetList || budgetList.length === 0) return null;
    // if budget list exists then finds the active budget
    const list = budgetList.filter((b) => b.month <= CurrentMonth());
    const latest = list.length > 0 ? list[list.length - 1] : list[0];

    return {
      userID,
      year,
      month: latest.month,
      amount: latest.budget,
    };
  }, [BudgetData]);

  //NOTE - creates arr objs of year wise each month budget list and year total
  const BudgetByMonth = useMemo(() => {
    // checks redux state var
    if (!Array.isArray(BudgetData)) return null;

    return BudgetData.map((data) => {
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
  }, [BudgetData]);

  const getBudgetListOfYear = (list, year = CurrentYear()) =>
    list?.find((l) => l.year === year)?.list ?? [];
  const getTotalBudgetOfYear = (list, year = CurrentYear()) =>
    list?.find((l) => l.year === year)?.totalBudget ?? null;

  //NOTE - creates a group of budget in month range
  const createBudgetRange = (data) => {
    if (!Array.isArray(data) || data.length <= 0) return null;
    const result = [];
    let start = data[0].month;
    let currentBudget = data[0].budget;
    for (let i = 1; i < data.length; i++) {
      if (data[i].budget !== currentBudget) {
        result.push({
          start,
          end: data[i - 1].month,
          budget: currentBudget,
        });

        start = data[i].month;
        currentBudget = data[i].budget;
      }
    }
    // Push the last group
    result.push({
      start,
      end: data[data.length - 1].month,
      budget: currentBudget,
    });

    return result;
  };

  const createBudgetWithExpense = (budget, expense) => {
    if (!Array.isArray(budget) || !Array.isArray(expense)) return [];
    const arr = [];
    for (let i = 0; i < 12; i++) {
      let b =
        budget.length <= 0
          ? 0
          : (budget?.find((b) => b.month === i)?.budget ?? 0);
      let e = expense?.find((e) => e.month === i)?.total ?? 0;

      console.log("BE", b, e);

      arr.push({
        id: i,
        month: getMonthName(i, "MMMM"),
        budget: b,
        expense: e,
        percent: e == 0 || b == 0 ? "00.00" : getBudgetExpPercent(b, e),
      });
    }
    console.log("arr", arr);

    return arr;
  };

  return {
    ActiveBudget,
    BudgetByMonth,
    getBudgetListOfYear,
    createBudgetRange,
    createBudgetWithExpense,
    getTotalBudgetOfYear,
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
