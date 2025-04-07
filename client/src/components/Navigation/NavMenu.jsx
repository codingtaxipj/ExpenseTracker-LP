import { navVars } from "../../global/global-variables";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import moment from "moment";
import { PiTagSimpleFill } from "react-icons/pi";

function Dashboard({ activeBtn, children }) {
  const navigate = useNavigate();

  function setStyle(toSet) {
    let baseStyle = "w-full py-2 text-left text-[24px] font-medium outline-0";
    if (activeBtn === toSet)
      return baseStyle + " " + "rounded-l-[12px] bg-[white] px-5 text-[black]";
    else
      return (
        baseStyle + " " + "text-slate-600 px-2 hover:px-5 hover:text-[white]"
      );
  }
  const currentDate = moment().format("Do MMMM YYYY");
  const currentWeek = moment().week();

  return (
    <>
      <div className="flex-screen flex h-screen w-full overflow-hidden bg-[black]">
        <div className="flex w-[22rem] flex-col">
          <div className="flex flex-col items-start py-[2.5rem] text-[white]">
            <div className="bg-pupl mb-5 size-[4rem] rounded-[12px]"></div>
            <p className="font-pop-m pb-1 text-[18px]">codingtaxipj</p>
            <p className="font-pop-r text-[12px]">prayasjadli18@gmail.com</p>
            <button>edit profile</button>
          </div>
          <div className="font-pop-b flex grow flex-col border-y-1 py-[2rem] text-[#979797]">
            <button
              onClick={() => navigate("/" + navVars.HOME)}
              autoFocus
              className={setStyle(navVars.HOME)}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/" + navVars.EXPENSE)}
              className={setStyle(navVars.EXPENSE)}
            >
              Expenses
            </button>
            <button
              onClick={() => navigate("/" + navVars.INCOME)}
              className={setStyle(navVars.INCOME)}
            >
              Income
            </button>
            <button className={setStyle(navVars.INCOME)}>Trip Expenses</button>
            <button className={setStyle(navVars.INCOME)}>Accounts</button>
            <button className={setStyle(navVars.INCOME)}>Graphical Data</button>
            <button className={setStyle(navVars.INCOME)}>Analysis</button>
            <button
              onClick={() => navigate("/" + navVars.ALL_CATEGORIES)}
              className={setStyle(navVars.ALL_CATEGORIES)}
            >
              All Categories
            </button>
            <button
              onClick={() => navigate("/" + navVars.POPUP_VIEW)}
              className={setStyle(navVars.POPUP_VIEW)}
            >
              Popup
            </button>
            <button
              onClick={() => navigate("/" + navVars.ELEMENTS)}
              className={setStyle(navVars.ELEMENTS)}
            >
              Elements
            </button>
          </div>

          <div className="flex flex-col">
            <button className={setStyle(navVars.INCOME)}>Trip Expenses</button>
          </div>
        </div>
        <div className="flex h-auto w-full flex-col bg-[red]">
          <div className="flex flex-row gap-5">
            <div>search bar</div>
            <div>account selected</div>
            <div className="inline-flex items-center">
              <PiTagSimpleFill className="text-gift" />
              <p className="pl-2">Today : {currentDate}</p>
            </div>
            <div className="inline-flex items-center">
              <PiTagSimpleFill className="text-gift" />
              <p className="pl-2">Current Week : {currentWeek}</p>
            </div>
          </div>

          <div className="h-full w-full bg-[white]"> {children}</div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
Dashboard.propTypes = {
  activeBtn: PropTypes.string,
  children: PropTypes.node,
};
