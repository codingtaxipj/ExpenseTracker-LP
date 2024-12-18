import { useState } from "react";
import HomeDashboard from "./components/HomeDashboard";
import IncomeDashboard from "./components/IncomeDashboard";
import ExpenseDashboard from "./components/ExpenseDashboard";
import AllCategories from "./components/AllCategories";

function App() {
  const [defaultDashboard, setDefaultDashboard] = useState("homeDashboard");

  return (
    <>
      <div className="absolute inset-0 w-full bg-pupl bg-cover bg-no-repeat">
        <div className="h-full w-full bg-[linear-gradient(to_right,_rgba(0,0,0,0.2)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(0,0,0,0.2)_1px,_transparent_1px)] px-[5rem] py-20 [background-size:25px_25px]">
          <div className="absolute inset-x-[8rem] inset-y-[6rem] flex flex-row rounded-[20px] bg-[black] px-8 py-8">
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
                  onClick={() => setDefaultDashboard(() => "homeDashboard")}
                  autoFocus
                  className="text-slate-600 w-full px-2 py-2 text-left text-[24px] font-medium outline-0 hover:px-5 hover:text-[white] focus:rounded-l-[12px] focus:bg-[white] focus:px-5 focus:text-[black]"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setDefaultDashboard(() => "expenseDashboard")}
                  className="text-white w-full px-2 py-2 text-left text-[24px] font-medium hover:px-5 hover:text-[white] focus:rounded-l-[12px] focus:bg-[white] focus:px-5 focus:text-[black]"
                >
                  Expenses
                </button>
                <button
                  onClick={() => setDefaultDashboard(() => "incomeDashboard")}
                  className="text-white w-full px-2 py-2 text-left text-[24px] font-medium hover:px-5 hover:text-[white] focus:rounded-l-[12px] focus:bg-[white] focus:px-5 focus:text-[black]"
                >
                  Income
                </button>
                <button
                  onClick={() => setDefaultDashboard(() => "AllCategories")}
                  className="text-white w-full px-2 py-2 text-left text-[24px] font-medium hover:px-5 hover:text-[white] focus:rounded-l-[12px] focus:bg-[white] focus:px-5 focus:text-[black]"
                >
                  All Categories
                </button>
              </div>
            </div>
            <div className="w-full rounded-[20px] bg-[white]">
              {defaultDashboard === "homeDashboard" && <HomeDashboard />}
              {defaultDashboard === "incomeDashboard" && <IncomeDashboard />}
              {defaultDashboard === "expenseDashboard" && <ExpenseDashboard />}
              {defaultDashboard === "AllCategories" && <AllCategories />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
