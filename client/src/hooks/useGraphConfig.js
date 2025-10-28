import { filterTypes, selectCurrentFilter } from "@/redux/slices/filter-slice";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useTotalConfig from "./useTotalConfig";
import { selectGraphData } from "@/redux/selectors/graph-selector";
import Flexrow from "@/components/section/flexrow";
import { getMonthName } from "@/utilities/calander-utility";

export const useGraphConfig = ({
  isExpense,
  isDashboard,
  isBudgetExpenseCombo,
}) => {
  //
  const { ExpenseGraphData, IncomeGraphData } = useSelector(selectGraphData);
  const {
    ExpenseOfYear,
    IncomeOfYear,
    ExpenseOfMonth,
    IncomeOfMonth,
    ExpenseInLastMonths,
    IncomeInLastMonths,
    ExpenseInLastDays,
    IncomeInLastDays,
  } = useTotalConfig();

  const currentFilter = useSelector(selectCurrentFilter);
  const FilterYear = Number(currentFilter.values.year);
  const FilterMonth = Number(currentFilter.values.month);
  const FilterType = currentFilter.type;

  const { GraphTitle, GraphSubText, GraphFootText, TitleTotal, isArea } =
    useMemo(() => {
      // --- Declare variables with default values ---
      let GraphTitle = "";
      let GraphSubText = "";
      let GraphFootText = "";
      let TitleTotal = { e: 0, i: 0 };
      let isArea = false;

      // --- Determine text and totals based on FilterType ---
      switch (FilterType) {
        case filterTypes.BY_YEAR:
        case filterTypes.THIS_YEAR:
          GraphTitle = `${isDashboard ? `Transactions` : isExpense ? "Expense" : "Income"}  in Year ${FilterYear}`;
          GraphSubText = `Tracking monthly ${isDashboard ? `transactions` : isExpense ? "expenses" : "income"} for ${FilterYear}.`;
          GraphFootText = `Showing total ${isDashboard ? `transactions` : isExpense ? "expenses" : "income"} recorded each month.`;
          // Get the yearly total from the specific selectors

          TitleTotal = { e: ExpenseOfYear, i: IncomeOfYear };

          break;

        case filterTypes.BY_MONTH:
        case filterTypes.THIS_MONTH:
          const monthName = getMonthName(FilterMonth, "MMMM");
          GraphTitle = `${isExpense ? "Expense" : "Income"} in ${monthName}`;
          GraphSubText = `Tracking daily ${isDashboard ? `transactions` : isExpense ? "expenses" : "income"} for ${monthName}, ${FilterYear}.`;
          GraphFootText = `Showing total ${isDashboard ? `transactions` : isExpense ? "expenses" : "income"} recorded each Day.`;
          // Get the monthly total from the specific selectors

          TitleTotal = { e: ExpenseOfMonth, i: IncomeOfMonth };

          isArea = true;
          break;

        case filterTypes.LAST_9_MONTHS:
        case filterTypes.LAST_6_MONTHS:
        case filterTypes.LAST_3_MONTHS:
          // Determine the specific number of months
          const numMonths =
            FilterType === filterTypes.LAST_9_MONTHS
              ? 9
              : FilterType === filterTypes.LAST_6_MONTHS
                ? 6
                : 3;
          GraphTitle = `${isDashboard ? `Transactions` : isExpense ? "Expense" : "Income"} in Last ${numMonths} Months`;
          GraphSubText = `Tracking Monthly ${isDashboard ? `transactions` : isExpense ? "expenses" : "income"} of Last ${numMonths} Months`;
          GraphFootText = `Showing total ${isDashboard ? `transactions` : isExpense ? "expenses" : "income"} recorded each month.`;
          // Calculate total by summing the graph data for this range
          TitleTotal = { e: ExpenseInLastMonths, i: IncomeInLastMonths };

          break;

        case filterTypes.LAST_30_DAYS:
        case filterTypes.LAST_15_DAYS:
        case filterTypes.LAST_7_DAYS:
          // Determine the specific number of days
          const numDays =
            FilterType === filterTypes.LAST_30_DAYS
              ? 30
              : FilterType === filterTypes.LAST_15_DAYS
                ? 15
                : 7;
          GraphTitle = `${isDashboard ? `Transactions` : isExpense ? "Expense" : "Income"} in Last ${numDays} Days`;
          GraphSubText = `Tracking Daily ${isDashboard ? `transactions` : isExpense ? "expenses" : "income"} of Last ${numDays} Days`;
          GraphFootText = `Showing total ${isDashboard ? `transactions` : isExpense ? "expenses" : "income"} recorded each day.`;
          // Calculate total by summing the graph data for this range
          TitleTotal = { e: ExpenseInLastDays, i: ExpenseInLastDays };

          isArea = true;

          break;

        // Add cases for other filter types if needed
        // case filterTypes.ALL_TIME: ...
        // case filterTypes.CUSTOM_DATES: ...

        default:
          // Handle any unexpected filter types
          GraphTitle = "Select a Filter";
          break;
      }

      return { GraphTitle, GraphSubText, GraphFootText, TitleTotal, isArea };
    }, [
      // Ensure ALL dependencies used in the switch are listed
      FilterType,
      FilterYear,
      FilterMonth,
      isExpense,
      ExpenseOfYear,
      IncomeOfYear,
      ExpenseOfMonth,
      IncomeOfMonth,
      ExpenseInLastMonths,
      IncomeInLastMonths,
      ExpenseInLastDays,
      IncomeInLastDays,
    ]);

  return {
    ExpenseGraphData,
    IncomeGraphData,
    GraphTitle,
    GraphSubText,
    GraphFootText,
    TitleTotal,
    isArea,
  };
};
