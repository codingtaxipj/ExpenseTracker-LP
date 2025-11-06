import {
  expenseCategories,
  getPrimeCategories,
  getSubOfPrime,
  getSubOfPrime_Exp,
} from "@/global/categories";
import {
  selectExpenseList,
  selectGlobalFilteredExpense,
  selectGlobalFilteredIncome,
  selectIncomeList,
  selectRecentTransactionsList,
} from "@/redux/selectors/transaction-selector";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const useTransactionConfig = () => {
  const {
    expenseLoading,
    expenseError,
    incomeLoading,
    incomeError,
    recentTransactionsLoading,
  } = useSelector((state) => state.transaction);
  const ExpenseList = useSelector(selectExpenseList);
  const IncomeList = useSelector(selectIncomeList);
  const RecentTransactionList = useSelector(selectRecentTransactionsList);
  const FilteredExpenseList = useSelector(selectGlobalFilteredExpense);
  const FilteredIncomeList = useSelector(selectGlobalFilteredIncome);

  //? --- filter for transactions ---
  const TransactionFilters = {
    DEFAULT: "Default",
    IS_TRIP: "Trip Transactions",
    IS_RECURRING: "Recurring Transactions",
    BY_PRIME: "Prime Category",
    BY_SUB: "Sub Category",
  };
  //? --- sorting for transactions ---
  const TransactionSorts = {
    BY_DATE: "By Date",
    BY_AMOUNT: "By Amount",
  };
  //? --- Expense Prime Categories ---
  const expensePrimes = getPrimeCategories(expenseCategories);

  //NOTE - states for filter and sort
  const [listFilter, setListFilter] = useState(TransactionFilters.DEFAULT);
  const [prime, setPrime] = useState(expensePrimes[0]);
  const [availableSubs, setAvailableSubs] = useState(() =>
    getSubOfPrime_Exp(prime),
  );
  const [sub, setSub] = useState(availableSubs[0]);
  const [sortList, setSortList] = useState(TransactionSorts.BY_DATE);
  const [sortOrder, setSortOrder] = useState(1);

  //NOTE - handlers for filter and sort
  const handleListFilter = (value) => setListFilter(value);
  const handlePrimeFilter = (p) => setPrime(p);
  const handleSubFilter = (s) => setSub(s);
  const handleListSort = (sort) => setSortList(sort);
  const handleOrder = () => setSortOrder((d) => (d === 1 ? 2 : 1));
  const handleReset = () => {
    setListFilter(TransactionFilters.DEFAULT);
    setPrime(expensePrimes[0]);
    setSortList(TransactionSorts.BY_DATE);
    setSortOrder(1);
  };

  //? --- update sub list on selecting prime --
  useEffect(() => {
    const newSubList = getSubOfPrime_Exp(prime);
    setAvailableSubs(newSubList);
    setSub(newSubList[0]);
  }, [prime]);

  //NOTE - Filtered Expense List
  const FilteredExpenses = useMemo(() => {
    if (!ExpenseList) return [];
    let filteredList = FilteredExpenseList;

    if (listFilter === TransactionFilters.IS_TRIP) {
      return filteredList.filter((e) => e.isTripExpense === true);
    }
    if (listFilter === TransactionFilters.IS_RECURRING) {
      return filteredList.filter((e) => e.isRecurringExpense === true);
    }
    if (listFilter === TransactionFilters.BY_PRIME) {
      return filteredList.filter((e) => e.primeCategory === prime);
    }
    if (listFilter === TransactionFilters.BY_SUB) {
      return filteredList.filter(
        (e) => e.primeCategory === prime && e.subCategory === sub,
      );
    }
    const sortedList = [...filteredList];

    console.log("list", sortedList);

    sortedList.sort((a, b) => {
      let aVal, bVal;

      if (sortList === TransactionSorts.BY_AMOUNT) {
        aVal = a.ofAmount;
        bVal = b.ofAmount;
      } else {
        // Default to date
        aVal = new Date(a.onDate);
        bVal = new Date(b.onDate);
      }

      if (sortOrder === 1) {
        return aVal - bVal;
      } else {
        return bVal - aVal;
      }
    });

    return sortedList;
  }, [listFilter, prime, sub, sortList, sortOrder, FilteredExpenseList]);

  return {
    ExpenseList,
    IncomeList,
    FilteredExpenseList,
    FilteredIncomeList,
    expenseLoading,
    expenseError,
    incomeLoading,
    incomeError,
    RecentTransactionList,
    recentTransactionsLoading,
    FilteredExpenses,
    TransactionFilters,
    TransactionSorts,
    listFilter,
    sortList,
    prime,
    availableSubs,
    sub,
    handleListFilter,
    handlePrimeFilter,
    handleSubFilter,
    handleListSort,
    handleOrder,
    handleReset,
    expensePrimes,
  };
};

export default useTransactionConfig;
