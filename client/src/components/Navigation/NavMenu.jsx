import { navVars } from "../../global/global-variables";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

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

  return (
    <>
      <div className="absolute inset-0 flex h-full w-full flex-row bg-[black] px-8 py-8">
        <div className="w-[22rem]">
          <div className="py-[2.5rem] text-[white]">
            <div className="mb-5 size-[5rem] rounded-[12px] bg-pupl"></div>
            <p className="pb-1 font-pop-m text-[18px]">codingtaxipj</p>
            <p className="font-pop-r text-[12px]">prayasjadli18@gmail.com</p>
          </div>
          <div className="flex flex-col py-[2rem] font-pop-b text-[#979797]">
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
          </div>
        </div>
        <div className="h-full w-full rounded-[20px] bg-[white]">
          {/* ------------------------- * ANCHOR childern prop ------------------------- */}
          {children}
          {/* -------------------------------------------------------------------------- */}
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
