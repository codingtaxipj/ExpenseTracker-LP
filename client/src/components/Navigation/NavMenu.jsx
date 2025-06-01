import { PATH } from "@/router/routerConfig";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { MdCalculate, MdSpaceDashboard } from "react-icons/md";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCarSide,
  FaMapPin,
  FaUser,
} from "react-icons/fa";

function Dashboard({ activeBtn, children }) {
  const navigate = useNavigate();

  function setStyle(toSet) {
    let baseStyle =
      "flex w-full items-center gap-2.5 rounded-md px-2 py-1  text-base ";
    if (activeBtn === toSet)
      return baseStyle + " " + "text-black bg-white font-normal";
    else return baseStyle + " " + "hover:bg-[#2c2c2c] font-medium";
  }
  const currentDate = moment().format("Do MMMM YYYY");
  const currentWeek = moment().week();

  return (
    <>
      <div className="flex h-screen w-screen text-white">
        <div className="bg-greyBlack flex w-1/6 flex-col p-5">
          <div className="flex flex-col gap-1.5 py-10">
            <div className="bg-pupl mx-2 my-1 size-[4rem] rounded-[12px]"></div>
            <button className="flex w-full items-center gap-2.5 rounded-md px-2 text-base">
              <FaUser />
              <span>codingtaxipj</span>
            </button>
            <button className="flex w-full items-center gap-2.5 rounded-md px-2 text-sm">
              <span>prayasjadli18@gamil.com</span>
            </button>
          </div>
          <div className="flex grow flex-col gap-2">
            <button className="flex w-full items-center gap-2.5 rounded-md px-2 py-1 text-sm font-medium text-[#a6a6a6]">
              <span>Menu</span>
            </button>
            <button
              onClick={() => navigate(PATH.home)}
              className={setStyle(PATH.home)}
            >
              <MdSpaceDashboard />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate(PATH.expense)}
              className={setStyle(PATH.expense)}
            >
              <GiPayMoney />
              <span>Expense</span>
            </button>
            <button
              onClick={() => navigate(PATH.expenseAnalysis)}
              className={setStyle(PATH.expenseAnalysis)}
            >
              <MdCalculate />
              <span>Expense Analysis</span>
            </button>
            <button
              onClick={() => navigate(PATH.income)}
              className={setStyle(PATH.income)}
            >
              <GiReceiveMoney />
              <span>Income</span>
            </button>
            <button
              onClick={() => navigate(PATH.incomeAnalysis)}
              className={setStyle(PATH.incomeAnalysis)}
            >
              <MdCalculate />
              <span>Income Analysis</span>
            </button>

            <button className={setStyle()}>
              <FaCarSide />
              <span>Trip Expense</span>
            </button>
          </div>
        </div>
        <div className="bg-greyBlack flex w-full flex-col p-2.5">
          <div className="flex cursor-default flex-row gap-2.5 px-1 pb-2.5 text-xs">
            <div className="flex grow justify-start gap-2.5">
              <div className="flex items-center gap-1 pl-0.5 text-sm">
                <FaMapPin />
                {activeBtn === PATH.home && <span>Dashboard</span>}
                {activeBtn === PATH.expense && <span>Expense Data</span>}
                {activeBtn === PATH.income && <span>Income Data</span>}
                {activeBtn === PATH.expenseAnalysis && (
                  <span>Expense Data Analysis</span>
                )}
                {activeBtn === PATH.incomeAnalysis && (
                  <span>Income Data Analysis</span>
                )}
              </div>
            </div>
            <div className="flex grow justify-end gap-2.5 pr-2">
              <div className="flex items-center gap-2 rounded-sm p-0.5">
                <FaCalendarDay />
                <span>{currentDate}</span>
              </div>
              <span className="border-r"></span>
              <div className="flex items-center gap-2 rounded-sm p-0.5">
                <FaCalendarWeek />
                <span>{currentWeek}th Week</span>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-row overflow-y-auto rounded-md">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
