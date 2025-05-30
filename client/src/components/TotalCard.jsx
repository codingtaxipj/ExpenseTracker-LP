import moment from "moment";
import { useEffect, useState } from "react";
import { BsBarChartFill } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";

import { useSelector } from "react-redux";

const TotalCard = ({ isExpense, cardFor }) => {
  const [cardConfig, setCardConfig] = useState({
    currYear: moment().year(),
    total: 0,
    title: null,
    setFor: isExpense ? "Expense" : "Income",
  });

  const yearsData = useSelector((state) => state.configTotal.byYear);
  useEffect(() => {
    if (cardFor.toLowerCase().trim() === "year") {
      if (yearsData != 0) {
        const prevYear = yearsData[cardConfig.currYear - 1].total || false;
        const currYear = yearsData[cardConfig.currYear].total || false;

        if (prevYear) {
          setCardConfig((prev) => ({
            ...prev,
            title: `Last Year ${cardConfig.setFor}`,
            total: prevYear,
          }));
        } else {
          if (currYear) {
            setCardConfig((prev) => ({
              ...prev,
              title: `This Year ${cardConfig.setFor}`,
              total: currYear,
            }));
          }
        }
      }
    }
  }, [yearsData, cardConfig, cardFor]);

  return (
    <>
      <div className="border-grey-border flex w-1/2 flex-col gap-2 rounded-md border p-5">
        <div className="flex items-center gap-2 text-sm">
          <BsBarChartFill />
          <span>{cardConfig.title}</span>
        </div>

        <div className="flex items-center gap-1 text-3xl font-bold">
          <FaIndianRupeeSign />
          <span>{cardConfig.total}</span>
        </div>
      </div>
    </>
  );
};

export default TotalCard;
