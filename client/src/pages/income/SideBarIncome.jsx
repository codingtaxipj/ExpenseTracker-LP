import SideBar from "@/components/SideBar";
import { filterMaxIncomePrime } from "@/redux/slices/filterMaxExpense";
import { PATH } from "@/router/routerConfig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBarIncome = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [maxIncome, setMaxIncome] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.filterMaxExpense.maxIncomePrime);

  useEffect(() => {
    dispatch(filterMaxIncomePrime());
  }, [dispatch]);

  useEffect(() => {
    if (data !== null) {
      setEntries(data);
      setLoading(false);
      const totalSum = data.reduce((sum, item) => sum + item.categoryTotal, 0);
      setMaxIncome(totalSum);
    }
  }, [data]);

  return (
    <>
      <div className="flex h-full w-[30%] flex-col items-center justify-center gap-10 rounded-r-[20px] bg-[#f3f4f6]">
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

        <div className="inline-flex w-[70%]">
          <button
            onClick={() => navigate(PATH.addIncome)}
            className="bg-income w-full rounded-md px-4 py-1 text-[white]"
          >
            Add Income
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarIncome;
