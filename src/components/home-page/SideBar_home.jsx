import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiTagSimpleFill } from "react-icons/pi";
import { useNavigate } from "react-router";
import { navVars } from "../../global/global-variables";

const SideBar_home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-full w-[30%] rounded-r-[20px] bg-[#f3f4f6]">
        <div className="flex h-full flex-col justify-center gap-10 px-14">
          <div>
            <h6 className="inline-flex items-center gap-2 font-pop-sb text-[16px] text-black">
              <PiTagSimpleFill className="text-pupl" />
              How much you spent ?
            </h6>

            {[1, 2, 3, 4, 5].map((data) => (
              <div key={data}>
                <div className="flex grow flex-row gap-2 pb-1 pt-4 font-pop-m text-[14px]">
                  <p className="w-full">Utlities & Bills</p>
                  <p className="flex items-center text-right font-pop-sb">
                    <FaIndianRupeeSign /> <span>20</span>
                  </p>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#d1d5db]">
                  <div className="h-full w-[45%] rounded-full bg-pupl"></div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h6 className="inline-flex items-center gap-2 font-pop-sb text-[16px] text-black">
              <PiTagSimpleFill className="text-pupl" /> How much you earned ?
            </h6>

            {[1, 2, 3, 4, 5].map((data) => (
              <div key={data}>
                <div className="flex grow flex-row gap-2 pb-1 pt-4 font-pop-m text-[14px]">
                  <p className="w-full">Utlities & Bills</p>
                  <p className="flex items-center text-right font-pop-sb">
                    <FaIndianRupeeSign /> <span>20</span>
                  </p>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#d1d5db]">
                  <div className="h-full w-[45%] rounded-full bg-pupl"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="inline-flex justify-center gap-5">
            <button
              onClick={() => navigate(navVars.ADD_EXPENSE)}
              className="rounded-md bg-pupl px-4 py-1 text-[white]"
            >
              Add Expence
            </button>
            <button
              onClick={() => navigate(navVars.ADD_INCOME)}
              className="rounded-md bg-pupl px-4 py-1 text-[white]"
            >
              Add Income
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar_home;
