import { calander } from "@/global/globalVariables";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsBarChartFill } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";

import { useSelector } from "react-redux";

const TotalCard = ({ isExpense, cardFor }) => {
  const [cardConfig, setCardConfig] = useState({
    Y: moment().year(),
    M: moment().month(),
    total: 0,
    title: null,
    byCalander: cardFor,
    setFor: isExpense ? "Expense" : "Income",
  });

  const expY = useSelector((state) => state.configTotal.expense.byYear);
  const incY = useSelector((state) => state.configTotal.income.byYear);
  const yearData = isExpense ? expY : incY;
  const expM = useSelector((state) => state.configTotal.expense.byMonth);
  const incM = useSelector((state) => state.configTotal.income.byMonth);
  const monthData = isExpense ? expM : incM;

  useEffect(() => {
    const setTotalData = (last, current, byCalander) => {
      console.log(`${byCalander} == L- ${last} & C-${current}`);

      if (!last && !current) {
        setCardConfig((prev) => ({
          ...prev,
          title: `No ${cardConfig.setFor} `,
          total: 0,
        }));
      }
      if (last) {
        setCardConfig((prev) => ({
          ...prev,
          title: `Last ${byCalander} ${cardConfig.setFor}`,
          total: last || 0,
        }));
      } else {
        if (current) {
          setCardConfig((prev) => ({
            ...prev,
            title: `This ${byCalander} ${cardConfig.setFor}`,
            total: current || 0,
          }));
        }
      }
    };

    // NOTE : Total by Year
    if (cardConfig.byCalander === calander.year) {
      if (Object.keys(yearData).length > 0) {
        const last = yearData[cardConfig.Y - 1]?.total || false;
        const current = yearData[cardConfig.Y]?.total || false;
        setTotalData(last, current, cardConfig.byCalander);
      }
    }
    // NOTE : Total by Month
    if (cardConfig.byCalander === calander.month) {
      if (Object.keys(monthData).length > 0) {
        const last =
          (cardConfig.M == 0 && monthData[cardConfig.Y - 1]?.[11]?.total) ||
          (cardConfig.M > 0 &&
            monthData[cardConfig.Y]?.[cardConfig.M - 1]?.total) ||
          false;

        const current = monthData[cardConfig.Y]?.[cardConfig.M]?.total || false;
        setTotalData(last, current, cardConfig.byCalander);
      }
    }
  }, [
    yearData,
    monthData,

    cardConfig.Y,
    cardConfig.M,
    cardConfig.W,
    cardConfig.byCalander,
    cardConfig.setFor,
  ]);

  return (
    <>
      <div className="border-grey-border flex w-1/2 flex-col gap-2 rounded-md border p-5">
        <div className="flex items-center gap-2 text-sm">
          <BsBarChartFill />
          <span>{cardConfig.title}</span>
        </div>

        <div className="flex items-center gap-1 text-3xl font-bold">
          {cardConfig.total == 0 ? (
            <span>No Data</span>
          ) : (
            <>
              <FaIndianRupeeSign />
              <span>{cardConfig.total}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TotalCard;
