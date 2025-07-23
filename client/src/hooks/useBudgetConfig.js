import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useBudgetConfig = () => {
  const BudgetData = useSelector((state) => state.budget.expenseTotalData);

  //NOTE - gets the budget list of user by each year
  const BudgetListByYear = useMemo(() => {
    // checks redux state var
    if (!Array.isArray(BudgetData)) return null;
    return BudgetData;
  }, [BudgetData]);

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

  return { ActiveBudget, BudgetListByYear, BudgetByMonth };
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
