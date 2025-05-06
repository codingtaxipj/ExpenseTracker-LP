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
