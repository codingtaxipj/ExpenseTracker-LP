import { getMonthName } from "@/utilities/calander-utility";
import moment from "moment";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useRecurringConfig = () => {
  const RecurringData = useSelector((state) => state.transaction.recurringData);

  const RecurringList = useMemo(() => {
    if (!Array.isArray(RecurringData)) return null;
    return RecurringData;
  }, [RecurringData]);

  const rcTotal = useMemo(() => {
    let arr = {
      byMonth: (RecurringList?.filter((m) => m.isRepeatBy == 1) ?? []).reduce(
        (t, i) => t + i.ofAmount,
        0,
      ),
      byYear: (RecurringList?.filter((m) => m.isRepeatBy == 2) ?? []).reduce(
        (t, i) => t + i.ofAmount,
        0,
      ),
    };
    return arr;
  }, [RecurringList]);

  const recurringChartData = useMemo(() => {
    let m = Array.from({ length: 12 }, (_, i) => ({
      month: i,
      expense: rcTotal.byMonth,
    }));

    let y = (RecurringList ?? [])
      .filter((r) => r.isRepeatBy == 2)
      .map((r) => ({
        month: moment(r.onDate).month(),
        total: r.ofAmount,
      }));

    let arr = m.map((item) => {
      const totalForMonth = y
        .filter((entry) => entry.month === item.month)
        .reduce((sum, entry) => sum + entry.total, 0);

      return { ...item, expense: item.expense + totalForMonth };
    });

    arr = arr.map((a) => ({
      amount: a.expense,
      month: getMonthName(a.month, "MMMM"),
    }));

    return arr;
  }, [rcTotal, RecurringList]);

  return { RecurringList, rcTotal, recurringChartData };
};

export default useRecurringConfig;
