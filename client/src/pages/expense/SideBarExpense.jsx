import SideBar from "@/components/SideBar";
import useInitalReduxLoad from "@/components/useInitalReduxLoad";
import { PATH } from "@/router/routerConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarExpense = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [maxExpense, setMaxExpense] = useState(0);

  return (
    <>
      <div className="bg-greyBlack flex h-full w-1/4 flex-col justify-center gap-6 px-10 py-4 text-white">
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
        <div>
          <button
            onClick={() => navigate(PATH.addExpense)}
            className="bg-travel w-full rounded-md px-4 py-1"
          >
            Add Expence
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarExpense;
