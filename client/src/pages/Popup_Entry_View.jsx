import { useRef, useState } from "react";
import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/globalVariables";

const PopupEntryView = () => {
  const [popupView, setPopupView] = useState(true);
  const blurBg = useRef();
  function closeModal(e) {
    if (blurBg.current === e.target) {
      setPopupView(false);
    }
  }
  return (
    <>
      <NavMenu activeBtn={navVars.POPUP_VIEW}>
        <div className="relative flex flex-row p-10">
          <button
            onClick={() => setPopupView(true)}
            className="bg-travel rounded-md px-4 py-1 text-[white]"
          >
            click me
          </button>

          {popupView && (
            <>
              <div
                ref={blurBg}
                onClick={(e) => closeModal(e)}
                className="bg-opacity-30 fixed inset-0 flex items-center justify-start bg-black backdrop-blur-sm"
              >
                <div className="w-[32rem] rounded-[20px] bg-[white] px-8 py-5">
                  <div className="flex flex-row items-center justify-start pb-2">
                    <h4 className="font-pop-b pl-2 text-[24px] text-black">
                      Expense For
                    </h4>
                  </div>
                  <div className="inline-flex w-full flex-grow items-center gap-3 py-3">
                    <div></div>
                    <div className="flex flex-col">
                      <div>
                        <p className="font-pop-b text-[24px]">Rent</p>
                      </div>
                      <div className="font-pop-m flex items-center gap-2 text-[14px]">
                        <p>From</p>
                        <span className="bg-travel rounded-full p-[3px]"></span>
                        <p>Utilities & Bills</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-grow border-b border-dashed py-1">
                    <div className="grow">
                      <p className="font-pop-m text-[14px]">Amount</p>
                    </div>
                    <div className="grow text-right">
                      <p className="font-pop-b text-[22px]">300</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-grow border-b border-dashed py-3">
                    <div className="grow">
                      <p className="font-pop-m text-[14px]">Spend on </p>
                    </div>
                    <div className="grow text-right">
                      <p className="font-pop-sb text-[14px]">26/2/2025</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-grow border-b border-dashed py-3">
                    <div className="grow">
                      <p className="font-pop-m text-[14px]">Tagged with </p>
                    </div>
                    <div className="text-right">
                      <p className="bg-travel rounded-sm px-2 text-[14px] text-[white]">
                        TAG
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-grow border-b border-dashed py-3">
                    <div className="grow">
                      <p className="font-pop-m text-[14px]">Spend at </p>
                    </div>
                    <div className="grow text-right">
                      <p className="font-pop-sb text-[14px]">
                        here is the title
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full flex-grow flex-col gap-1 py-3">
                    <div className="grow">
                      <p className="font-pop-m text-[14px]">Describe</p>
                    </div>
                    <div className="grow">
                      <p className="font-pop-sb text-[14px]">
                        here is the title
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full flex-grow gap-5 py-3">
                    <button
                      onClick={() => setPopupView(false)}
                      className="bg-income rounded-md px-4 py-1 text-[white]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setPopupView(false)}
                      className="rounded-md bg-[#d71919] px-4 py-1 text-[white]"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setPopupView(false)}
                      className="bg-travel rounded-md px-4 py-1 text-[white]"
                    >
                      close me
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </NavMenu>
    </>
  );
};

export default PopupEntryView;
