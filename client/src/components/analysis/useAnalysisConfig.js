import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import usePageConfig from "../usePageConfig";

const useAnalysisConfig = () => {
  usePageConfig();
  const expenseTotal = useSelector((state) => state.configTotal.expense);
  const [expenseTotalConfig, setExpenseTotalData] = useState({
    year: {
      data: {},
      loading: true,
    },
    subCat: {
      data: {},
      loading: true,
    },
  });

  useEffect(() => {
    if (Object.keys(expenseTotal.bySub).length > 0) {
      setExpenseTotalData((prev) => ({
        ...prev,
        subCat: {
          data: expenseTotal.bySub,
          loading: false,
        },
      }));
    }
  }, [expenseTotal.bySub]);

  return { expenseTotalConfig };
};

export default useAnalysisConfig;

/* 


useCalculate(
  dataConfig.income.loading ? [] : dataConfig.income.entries,
  false
);
useCalculate(
  dataConfig.expense.loading ? [] : dataConfig.expense.entries,
  true
);


*/
