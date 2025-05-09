import SideBar from "@/components/SideBar";
import useInitalReduxLoad from "@/components/useInitalReduxLoad";
import { PATH } from "@/router/routerConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarIncome = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [maxIncome, setMaxIncome] = useState(0);
  const { incomeMaxData } = useInitalReduxLoad({
    isExpenseMaxData: false,
    isPrimeCategory: true,
  });
  useEffect(() => {
    if (incomeMaxData) {
      setEntries(incomeMaxData);
      const totalSum = incomeMaxData.reduce(
        (sum, item) => sum + item.categoryTotal,
        0,
      );
      setMaxIncome(totalSum);
      setLoading(false);
    }
  }, [incomeMaxData]);

  return (
    <>
      <div className="bg-greyBlack flex w-1/4 flex-col justify-center gap-6 px-10 py-4 text-white">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <SideBar
              sidebar_title={"How much you earned ?"}
              sidebar_for={PATH.income}
              incomingData={entries}
              totalSum={maxIncome}
            />
          </>
        )}

        <div>
          <button
            onClick={() => navigate(PATH.addIncome)}
            className="bg-income w-full rounded-md px-4 py-1"
          >
            Add Income
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarIncome;
