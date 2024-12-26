import {  useState } from "react";
import HomeDashboard from "./components/HomeDashboard";
import IncomeDashboard from "./components/IncomeDashboard";
import ExpenseDashboard from "./components/ExpenseDashboard";
import AllCategories from "./components/AllCategories";
import DataEntryForm from "./components/DataEntryForm";

function App() {
  const [defaultDashboard, setDefaultDashboard] = useState("DataEntryForm");


  function handleClickSideButtons(pageSelected) {
    setDefaultDashboard(pageSelected);
  }

  function setStyle(current) {
    let baseStyle = "w-full py-2 text-left text-[24px] font-medium outline-0";
    if (current === defaultDashboard)
      return baseStyle + " " + "rounded-l-[12px] bg-[white] px-5 text-[black]";
    else
      return (
        baseStyle + " " + "text-slate-600 px-2 hover:px-5 hover:text-[white]"
      );
  }

  return (
    <>
      <div className="absolute inset-0 w-full bg-pupl bg-cover bg-no-repeat">
        <div className="h-full w-full bg-[linear-gradient(to_right,_rgba(0,0,0,0.2)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(0,0,0,0.2)_1px,_transparent_1px)] px-[5rem] py-20 [background-size:25px_25px]">
          <div className="inset-x-[8rem] inset-y-[6rem] flex h-full flex-row rounded-[20px] bg-[black] px-8 py-8">
            <div className="w-[22rem] pl-10">
              <div className="py-[2.5rem] text-[white]">
                <div className="mb-5 size-[5rem] rounded-[12px] bg-pupl"></div>
                <p className="pb-1 font-pop-m text-[18px]">codingtaxipj</p>
                <p className="font-pop-r text-[12px]">
                  prayasjadli18@gmail.com
                </p>
              </div>
              <div className="flex flex-col py-[2rem] font-pop-b text-[#979797]">
                <button
                  
                  onClick={() => handleClickSideButtons("homeDashboard")}
                  autoFocus
                  className={setStyle("homeDashboard")}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleClickSideButtons("expenseDashboard")}
                  className={setStyle("expenseDashboard")}
                >
                  Expenses
                </button>
                <button
                  onClick={() => handleClickSideButtons("incomeDashboard")}
                  className={setStyle("incomeDashboard")}
                >
                  Income
                </button>
                <button
                  onClick={() => handleClickSideButtons("AllCategories")}
                  className={setStyle("AllCategories")}
                >
                  All Categories
                </button>
                <button
                  onClick={() => handleClickSideButtons("DataEntryForm")}
                  className={setStyle("DataEntryForm")}
                >
                  All Categories
                </button>
              </div>
            </div>
            <div className="h-full w-full rounded-[20px] bg-[white]">
              {defaultDashboard === "homeDashboard" && <HomeDashboard />}
              {defaultDashboard === "incomeDashboard" && <IncomeDashboard />}
              {defaultDashboard === "expenseDashboard" && <ExpenseDashboard />}
              {defaultDashboard === "AllCategories" && <AllCategories />}
              {defaultDashboard === "DataEntryForm" && <DataEntryForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
