import MyAppLogo from "./assets/app-logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt, faTrashCan, faIndianRupeeSign, faListUl, faCircle, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import AddIncomeModal from "./components/AddIncomeModal";
import AddExpenseModal from "./components/AddExpenseModal";
import {  useRef, useState } from "react";
function App() {
  let [entryTable, updateEntryTable] = useState([]);
  let balanceSheet = useRef({
    TotalBalance: 0,
    TotalExpence: 0,
    TotalIncome: 0,
  })  

  const IncomeModalRef = useRef(null);
  const ExpenseModalRef = useRef(null);
  const toggleIncomeModal = () => {
    IncomeModalRef.current.hasAttribute("open") ? IncomeModalRef.current.close() : IncomeModalRef.current.showModal()
  }
  const toggleExpenseModal = () => {
    ExpenseModalRef.current.hasAttribute("open") ? ExpenseModalRef.current.close() : ExpenseModalRef.current.showModal()
  }
  const addDataInList = (dataObject) => {
   if(dataObject.entryType === 1){
    balanceSheet.current.TotalBalance += dataObject.entryAmount;
    balanceSheet.current.TotalIncome += dataObject.entryAmount;
  }if(dataObject.entryType === 0){
    balanceSheet.current.TotalBalance -= dataObject.entryAmount;
    balanceSheet.current.TotalExpence += dataObject.entryAmount;
  }
   
   
    dataObject.entryKey = Math.floor(Math.random() * 10 ** 16);
    updateEntryTable(
      (prevData) => { return [...prevData, dataObject] }
    )
  }





 

  return (
    <>
      <div className=" w-full bg-[url('./assets/dark-blue-2.jpg')] bg-no-repeat bg-cover ">
        <div className="h-full w-full bg-[linear-gradient(to_right,_rgba(255,255,255,0.08)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.08)_1px,_transparent_1px)] [background-size:25px_25px]">
          <div className="p-[5rem]" >
            <div className="grid grid-cols-3">
              <div className="bg-[#10338a] text-[#ffffff]  w-full col-span-3 p-[0.75rem_2.5rem] rounded-t-[20px] ">
                <div className="flex justify-center items-center">
                  <h1 className=" w-full font-bold text-[22px]">
                    Expense Tracker Application
                  </h1>
                  <div><FontAwesomeIcon icon={faListUl}></FontAwesomeIcon></div>
                </div>
              </div>
              <div className="bg-[#f1f2f4] p-[2rem] rounded-bl-[20px]">
                <div className="flex flex-row justify-start items-center">
                  <div className="text-[12px] text-[#10338a] pt-1" ><div ><FontAwesomeIcon icon={faCircle} className="p-[2px]" ></FontAwesomeIcon> <FontAwesomeIcon className="p-[2px]" icon={faCircle} ></FontAwesomeIcon></div><div><FontAwesomeIcon className="p-[2px]" icon={faCircle} ></FontAwesomeIcon> <FontAwesomeIcon className="p-[2px]" icon={faCircle} ></FontAwesomeIcon></div></div>
                  <h4 className="text-[32px] text-[#10338a] font-bold ml-[.5rem]" >Dashboard</h4>
                </div>
                <div className="bg-gradient-to-r from-[#10338a] from-45% to-[#082263] rounded-[2rem] text-white py-[2.5rem] px-[2.25rem] mt-5" >
                  <h6 className="text-[22px]">Your Balance</h6>
                  <div className="flex flex-row items-center font-medium leading-[0.9]" >
                    <div className="text-[22px] pr-2" >$</div>
                    <div className="text-[42px]" >{balanceSheet.current.TotalBalance}</div>
                  </div>
                </div>
                <h6 className="text-[18px] text-[#10338a] font-medium mt-8 mb-3 pl-2 pr-2"> <FontAwesomeIcon className="pr-2" icon={faListUl}></FontAwesomeIcon> All Entries</h6>
                <div className="h-[30rem] overflow-auto">
                  <div className="w-full">



                    {entryTable.length === 0 ? <p> Empty List </p> : entryTable.map((e) => (

                      (e.entryType === 1) &&
                      (<div key={e.entrykey} className="bg-gradient-to-r from-[#98e1b7] to-[#eaf4ee] rounded-[1.25rem] drop-shadow-md py-[1rem] px-[.75rem] m-2 mb-5 flex flex-row items-center" >
                        <div className="bg-[#0d9646] border-none rounded-[.75rem] h-[3rem] w-[3.5rem] flex items-center justify-center" ><FontAwesomeIcon className="text-[#ffffff] text-[24px]" icon={faReceipt} /></div>
                        <div className="px-2 w-full overflow-hidden" >
                          <p className="text-[16px] font-medium text-[#19743f] " >{e.entryTitle}</p>
                          <h6 className="text-[18px] text-[#19743f] font-bold" ><FontAwesomeIcon icon={faIndianRupeeSign} ></FontAwesomeIcon> {e.entryAmount}</h6>
                        </div>
                        <button className="bg-tranparent px-2 border-none rounded-[.75rem] h-[2rem] w-[2rem] flex justify-end items-center" ><FontAwesomeIcon className="text-[#d61818] text-[18px]" icon={faTrashCan} /></button>
                      </div>) 
                      ||
                      (e.entryType === 0) && (
                        <div key={e.entrykey} className="bg-gradient-to-r from-[#fdcaca] to-[#f9ecec] rounded-[1.25rem] drop-shadow-md py-[1rem] px-[.75rem] m-2 mb-5 flex flex-row items-center" >
                          <div className="bg-[#d61818] border-none rounded-[.75rem] h-[3rem] w-[3.5rem] flex items-center justify-center" ><FontAwesomeIcon className="text-[#ffffff] text-[24px]" icon={faReceipt} /></div>
                          <div className="px-2 w-full overflow-hidden" >
                            <p className="text-[16px] font-medium text-[#921818] " >{e.entryTitle}</p>
                            <h6 className="text-[18px] text-[#921818] font-bold" ><FontAwesomeIcon icon={faIndianRupeeSign} ></FontAwesomeIcon> {e.entryAmount}</h6>
                          </div>
                          <button className="bg-tranparent px-2 border-none rounded-[.75rem] h-[2rem] w-[2rem] flex justify-end items-center" ><FontAwesomeIcon className="text-[#d61818] text-[18px]" icon={faTrashCan} /></button>
                        </div>
                      )

                    ))}


                  </div>
                </div>
              </div>
              <div className="bg-[#f1f2f4] p-[2rem]">
                <div className="flex flex-row justify-start items-center">
                  <div className="text-[12px] text-[#10338a] pt-1" ><div ><FontAwesomeIcon icon={faCircle} className="p-[2px]" ></FontAwesomeIcon> <FontAwesomeIcon className="p-[2px]" icon={faCircle} ></FontAwesomeIcon></div><div><FontAwesomeIcon className="p-[2px]" icon={faCircle} ></FontAwesomeIcon> <FontAwesomeIcon className="p-[2px]" icon={faCircle} ></FontAwesomeIcon></div></div>
                  <h4 className="text-[32px] text-[#10338a] font-bold ml-[.5rem]" >Dashboard</h4>
                </div>
                <div className="bg-gradient-to-r from-[#0d9646] to-[#16c25e] rounded-[2rem] text-white py-[2.5rem] px-[2.25rem] mt-5" >
                  <h6 className="text-[22px]">Your Income</h6>
                  <div className="flex flex-row items-center font-medium leading-[0.9]" >
                    <div className="text-[22px] pr-2" >$</div>
                    <div className="text-[42px]" >{balanceSheet.current.TotalIncome}</div>
                  </div>
                </div>
                <div className="mt-5" >
                  <button onClick={() => toggleIncomeModal()} className="bg-[#0d9646] text-white rounded-full px-[2rem] py-[.75rem] " > Add Income </button>
                </div>
                <AddIncomeModal addIncomeDataInList={addDataInList} IncomeModalRef={IncomeModalRef} closeModal={() => toggleIncomeModal()} ></AddIncomeModal>
                <div className="bg-gradient-to-r from-[#d61818] to-[#f52c2c] rounded-[2rem] text-white py-[2.5rem] px-[2.25rem] mt-5" >
                  <h6 className="text-[22px]">Your Expenses</h6>
                  <div className="flex flex-row items-center font-medium leading-[0.9]" >
                    <div className="text-[22px] pr-2" >$</div>
                    <div className="text-[42px]" >{balanceSheet.current.TotalExpence}</div>
                  </div>
                </div>
                <div className="mt-5" >
                  <button onClick={() => toggleExpenseModal()} className="bg-[#d61818] text-white rounded-full px-[2rem] py-[.75rem] font-medium text-[16px]" > Add Expense </button>
                </div>
                <AddExpenseModal addExpenseDataInList={addDataInList} ExpenseModalRef={ExpenseModalRef} closeModal={() => toggleExpenseModal()} ></AddExpenseModal>
              </div>
              <div className="bg-[#f1f2f4] p-[2rem] rounded-br-[20px]">
                <div className="flex-col items-start">
                  <img className="h-[8rem] w-auto" src={MyAppLogo} alt="logo-expense-tracker" />
                  <h2 className="text-[32px] text-[black] font-semibold leading-[0.9]" >Easiest way to track your money.</h2>
                  <button className="bg-[black] text-[white] rounded-full p-[0.5rem_1rem] mt-3 cursor-default" >
                    <span className="font-medium" >Get Started</span>
                    <span className="ml-5"><FontAwesomeIcon icon={faCircleArrowRight} /></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
