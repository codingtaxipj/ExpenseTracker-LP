import { PATH } from "@/router/routerConfig";
import { useNavigate } from "react-router-dom";

import { FaPowerOff, FaUser } from "react-icons/fa";

import { Icons } from "../icons";
import Flexcol from "../section/flexcol";
import Flexrow from "../section/flexrow";

import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { bgDarkA3 } from "@/global/style";
import ExpButton from "../buttons/exp-button";
import UserAvatar from "../UserAvatar";

import VerticalDevider from "../strips/vertical-devider";
import {
  ActiveClock,
  ActiveDate,
  GlobalFilter,
  PageTitle,
  UserLogout,
  UserSettings,
} from "./top-bar";
import { AddExp, AddInc, BudgetBarIndicator } from "./bottom-bar";

function Dashboard({ activeBtn, children }) {
  const navigate = useNavigate();

  function selectedStyle(toSet) {
    if (activeBtn === toSet) return "bg-slate-a1 [&>span]:text-dark-a1";
    else return "hover:bg-dark-a6 text-salte-a1";
  }

  // ----- Navigation array -----
  const nav = [
    {
      id: 0,
      name: <span>Dashboard</span>,
      icon: <Icons.dashbaord />,
      link: PATH.home,
    },
    {
      id: 1,
      name: <span>Expense</span>,
      icon: <Icons.expense />,
      link: PATH.expense,
    },
    {
      id: 2,
      name: <span>Recurring Expense</span>,
      icon: <Icons.repeat />,
      link: PATH.repeat,
    },
    {
      id: 3,
      name: <span>Trip Expense</span>,
      icon: <Icons.trip />,
      link: PATH.trip,
    },
    {
      id: 4,
      name: <span>Expense Analysis</span>,
      icon: <Icons.analysis />,
      link: PATH.expenseAnalysis,
    },
    {
      id: 5,
      name: <span>Income</span>,
      icon: <Icons.income />,
      link: PATH.income,
    },
    {
      id: 6,
      name: <span>Income Analysis</span>,
      icon: <Icons.analysis />,
      link: PATH.incomeAnalysis,
    },
    {
      id: 7,
      name: <span>Budgeting</span>,
      icon: <Icons.calc />,
      link: PATH.budget,
    },
  ];

  return (
    <>
      <Flexrow className="bg-dark-a1 justify-center">
        {/** ----- Main Body ---- */}
        <Flexcol className="!text-slate-a1 h-screen max-w-[1600px] gap-2.5 p-5">
          {/** ----- Top Bar ---- */}
          <Flexrow
            className={cn(
              "!text-14px w-full gap-2.5 rounded-sm border px-5 py-0.5",
              bgDarkA3,
            )}
          >
            <Flexrow
              className={cn(
                "flex-1 basis-1 items-center justify-start gap-2.5",
              )}
            >
              <ActiveClock />
              <VerticalDevider />
              <ActiveDate />
              <VerticalDevider />
              <PageTitle nav={nav} activeBtn={activeBtn} />
            </Flexrow>
            <Flexrow className={"flex-1 basis-1 items-center justify-center"}>
              <GlobalFilter />
            </Flexrow>
            <Flexrow
              className={cn("flex-1 basis-1 items-center justify-end gap-2.5")}
            >
              <UserSettings />
              <VerticalDevider />
              <UserLogout />
            </Flexrow>
          </Flexrow>

          {/** ----- Top Bar Ends ---- */}

          {/** ----- Middle ---- */}
          <Flexrow className="flex-1 gap-2.5">
            <Flexcol
              className={cn(
                "w-48 gap-0.75 rounded-md border px-2.5 py-6",
                bgDarkA3,
              )}
            >
              <UserAvatar />
              <ExpButton
                custom_iconbtn
                className="!text-14px text-slate-a1 justify-start space-x-0.75 px-2"
              >
                <FaUser className="text-slate-a5" />
                <span>codingtaxipj</span>
              </ExpButton>
              <Separator
                className={
                  "bg-slate-br1 mx-auto my-4 data-[orientation=horizontal]:w-[95%]"
                }
              />
              {nav.map((n) => (
                <ExpButton
                  key={n.id}
                  custom_textbtn
                  className={cn(
                    "!text-14px w-full justify-start space-x-0.75 p-1 px-2",
                    selectedStyle(n.link),
                  )}
                  onClick={() => navigate(n.link)}
                >
                  <span className="text-slate-a5"> {n.icon}</span>
                  {n.name}
                </ExpButton>
              ))}
            </Flexcol>

            <div className="!text-slate-1 border-dark-a3 relative flex-1 overflow-hidden rounded-md border bg-[radial-gradient(circle,_#161616_20%,_#080808_100%)]">
              <div className="scrollBar absolute inset-0 z-20 m-1.25 overflow-y-auto p-16">
                {children}
              </div>
            </div>
          </Flexrow>
          {/** ----- Middle Ends ---- */}

          {/** ----- Bottom Bar ---- */}
          <Flexrow
            className={cn(
              "!text-14px w-full gap-2.5 rounded-sm border px-5 py-0.5",
              bgDarkA3,
            )}
          >
            <Flexrow className={cn("w-1/2 items-center justify-start gap-2.5")}>
              <BudgetBarIndicator />
            </Flexrow>
            <Flexrow className={cn("w-1/2 items-center justify-end gap-2.5")}>
              <AddExp />
              <VerticalDevider />
              <AddInc />
            </Flexrow>
          </Flexrow>
          {/** ----- Bottom Bar Ends ---- */}
        </Flexcol>
        {/** ----- Main Body Ends ---- */}
      </Flexrow>
    </>
  );
}
export default Dashboard;

{
  /*


  bg-[linear-gradient(to_right,#161616_0.5px,transparent_1px),linear-gradient(to_bottom,#161616_0.5px,transparent_1px)]
  [background-size:18px_18px]
  [box-shadow:0_0_8px_#e8e8e8] 
  
  
  
  <>
      <div className="flex h-screen w-screen text-white">
        <div className="bg-greyBlack flex w-1/6 flex-col p-5">
          <div className="flex flex-col gap-1.5 py-10">
            <div className="bg-exp-bmx-2 my-1 size-[4rem] rounded-[12px]"></div>
            <button className="flex w-full items-center gap-2.5 rounded-md px-2 text-base">
              <FaUser />
              <span>codingtaxipj</span>
            </button>
            <button className="flex w-full items-center gap-2.5 rounded-md px-2 text-sm">
              <span>prayasjadli18@gamil.com</span>
            </button>
          </div>
          <div className="flex grow flex-col gap-2">
            <button className="text-14px flex w-full items-center gap-2.5 rounded-md px-2 py-1 font-medium text-[#a6a6a6]">
              <span>Menu</span>
            </button>
            <button
              onClick={() => navigate(PATH.home)}
              className={setStyle(PATH.home)}
            >
              
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate(PATH.expense)}
              className={setStyle(PATH.expense)}
            >
              
              <span>Expense</span>
            </button>
            <button
              onClick={() => navigate(PATH.trip)}
              className={setStyle(PATH.trip)}
            >
              
              <span>Trip Expense</span>
            </button>
            <button
              onClick={() => navigate(PATH.expenseAnalysis)}
              className={setStyle(PATH.expenseAnalysis)}
            >
              <Icons.analysis />
              <span>Expense Analysis</span>
            </button>
            <button
              onClick={() => navigate(PATH.income)}
              className={setStyle(PATH.income)}
            >
              
              <span>Income</span>
            </button>
            <button
              onClick={() => navigate(PATH.incomeAnalysis)}
              className={setStyle(PATH.incomeAnalysis)}
            >
              <Icons.analysis />
              <span>Income Analysis</span>
            </button>

            <button
              onClick={() => navigate(PATH.budget)}
              className={setStyle(PATH.budget)}
            >
              
              <span>Budgeting</span>
            </button>
            <button
              onClick={() => navigate(PATH.repeat)}
              className={setStyle(PATH.repeat)}
            >
              
              <span>Recurring Expenses</span>
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
                {activeBtn === PATH.budget && <span>Budgeting</span>}
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
                
              </div>
              <span className="border-r"></span>
              <div className="flex items-center gap-2 rounded-sm p-0.5">
                <FaClock />
                <span> {time.format("hh:mm A")}</span>
              </div>
            </div>
          </div>
          <div className="bg-darkBlack [&::-webkit-scrollbar-thumb]:bg-91 h-full w-full overflow-y-auto rounded-lg px-14 py-14 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {children}
          </div>
        </div>
      </div>
    </> */
}
