import SideBar from "@/components/SideBar";
import { filterMaxExpensePrime } from "@/redux/slices/filterMaxExpense";
import { PATH } from "@/router/routerConfig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SideBarExpense = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [maxExpense, setMaxExpense] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.filterMaxExpense.maxExpensePrime);

  useEffect(() => {
    dispatch(filterMaxExpensePrime());
  }, [dispatch]);

  useEffect(() => {
    if (data !== null) {
      setEntries(data);
      setLoading(false);
      const totalSum = data.reduce((sum, item) => sum + item.categoryTotal, 0);
      setMaxExpense(totalSum);
    }
  }, [data]);

  return (
    <>
      <div className="flex h-full w-[30%] flex-col items-center justify-center gap-10 rounded-r-[20px] bg-[#f3f4f6]">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <SideBar
              sidebar_title={"How much you spent ?"}
              sidebar_for={PATH.expense}
              incomingData={entries}
              totalSum={maxExpense}
            />
          </>
        )}
        <div className="inline-flex w-[70%]">
          <button
            onClick={() => navigate(PATH.addExpense)}
            className="bg-travel w-full rounded-md px-4 py-1 text-[white]"
          >
            Add Expence
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarExpense;
