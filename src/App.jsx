import dots_svg from "./assets/4dots.svg";
import MyAppLogo from "./assets/app-logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight, faReceipt, faTrashCan } from '@fortawesome/free-solid-svg-icons'


function App() {
  return (
    <>
      <div className="h-screen w-screen bg-[url('./assets/dark-blue.jpg')] ">
        <div className="absolute z-0 h-screen w-screen bg-[linear-gradient(to_right,_rgba(255,255,255,0.03)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.03)_1px,_transparent_1px)] [background-size:25px_25px]">
          <div className=" m-[4rem_6rem] grid grid-cols-3">
            <div className="bg-[#ffffff] w-full col-span-3 p-[0.75rem_2rem]">
              <h1 className="font-bold text-[#000000] text-[22px]">
                Expense Tracker Application
              </h1>
            </div>
            <div className="bg-[#d6d6d6] p-5">
              <div className="border-none border-black">
                <div className="p-2 px-4 bg-black text-white font-bold rounded-xl mb-2">
                  <h3 className="text-[22px]" >List Title</h3>
                </div>
                <div className="h-[60vh] overflow-auto">
                  <table className="w-full">
                    <tbody>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num, key) => (
                          <div key={key} className="bg-[#000000] rounded-[1rem] text-white py-[.5rem] px-[.5rem] m-2 flex flex-row items-center" >
                          <div className="bg-white border-none rounded-[.75rem] h-[3rem] w-[3.5rem] flex items-center justify-center" ><FontAwesomeIcon className="text-[black] text-[24px]" icon={faReceipt} /></div>
                          <div className="px-2 w-full overflow-hidden" >
                            <p className="text-[16px]" >title</p>
                            <h6 className="text-[18px]" >$ {num}</h6>
                          </div>
                          <button className="bg-tranparent px-2 border-none rounded-[.75rem] h-[2rem] w-[2rem] flex justify-end items-center" ><FontAwesomeIcon className="text-[#f72626] text-[18px]" icon={faTrashCan} /></button>
                        </div>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
            <div className="bg-[#d6d6d6] p-5">

              <div className="flex flex-row justify-start items-center">
                <img className="w-[2.5rem] h-auto m-[2px]" src={dots_svg} alt="dashboard-icon" />
                <h4 className="text-[32px] font-bold ml-[.5rem]" >Dashboard</h4>
              </div>
              <div className="bg-[#000000] rounded-[2rem] text-white py-[1.5rem] px-[2rem] mt-5" >
                <h6 className="text-[22px]">Your Balance</h6>
                <div className="flex flex-row items-center font-medium leading-[0.9]" >
                  <div className="text-[22px] pr-2" >$</div>
                  <div className="text-[42px]" >123,123,123</div>
                </div>
              </div>

              <div className="bg-[#0d9646] rounded-[2rem] text-white py-[1.5rem] px-[2rem] mt-5" >
                <h6 className="text-[22px]">Your Income</h6>
                <div className="flex flex-row items-center font-medium leading-[0.9]" >
                  <div className="text-[22px] pr-2" >$</div>
                  <div className="text-[42px]" >123,123,123</div>
                </div>
              </div>

              <div className="bg-[#a51313] rounded-[2rem] text-white py-[1.5rem] px-[2rem] mt-5" >
                <h6 className="text-[22px]">Your Expenses</h6>
                <div className="flex flex-row items-center font-medium leading-[0.9]" >
                  <div className="text-[22px] pr-2" >$</div>
                  <div className="text-[42px]" >123,123,123</div>
                </div>
              </div>

            

            </div>
            <div className="bg-[#d6d6d6] p-5">
              <div className="flex flex-col items-start">
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
    </>
  );
}

export default App;
