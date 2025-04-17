import { useRef } from "react";

import PropTypes from "prop-types";

const EntryPopup = ({ PopModal, data }) => {
  const blurBg = useRef();
  function closeModal(e) {
    if (blurBg.current === e.target) {
      PopModal(false);
    }
  }
  return (
    <>
      <div
        ref={blurBg}
        onClick={(e) => closeModal(e)}
        className="bg-opacity-30 fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm"
      >
        <div className="w-[32rem] rounded-[20px] bg-[white] px-8 py-5">
          <div className="inline-flex w-full flex-grow items-center gap-3 py-3">
            <div></div>
            <div className="flex flex-col">
              <div>
                <p className="font-pop-b text-[24px]">{data.subCategory}</p>
              </div>
              <div className="font-pop-m flex items-center gap-2 text-[14px]">
                <p>From</p>
                <span className="bg-travel rounded-full p-[3px]"></span>
                <p>{data.primeCategory}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-grow border-b border-dashed py-1">
            <div className="grow">
              <p className="font-pop-m text-[14px]">Amount</p>
            </div>
            <div className="grow text-right">
              <p className="font-pop-b text-[22px]">{data.amount}</p>
            </div>
          </div>
          <div className="flex w-full flex-grow border-b border-dashed py-3">
            <div className="grow">
              <p className="font-pop-m text-[14px]">Spend on </p>
            </div>
            <div className="grow text-right">
              <p className="font-pop-sb text-[14px]">{data.entryDate}</p>
            </div>
          </div>
          <div className="flex w-full flex-grow border-b border-dashed py-3">
            <div className="grow">
              <p className="font-pop-m text-[14px]">Tagged with </p>
            </div>
            <div className="font-pop-sb text-right text-[14px]">
              {data.userCategory !== null ? (
                <p className="bg-travel rounded-sm px-2 text-[white]">
                  {data.userCategory}
                </p>
              ) : (
                "## No Tag ##"
              )}
            </div>
          </div>
          <div className="flex w-full flex-grow border-b border-dashed py-3">
            <div className="grow">
              <p className="font-pop-m text-[14px]">Spend at </p>
            </div>
            <div className="grow text-right">
              <p className="font-pop-sb text-[14px]">
                {data.title !== null || data.title === ""
                  ? data.title
                  : "## No Title ##"}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-grow flex-col gap-1 py-3">
            <div className="grow">
              <p className="font-pop-m text-[14px]">Describe</p>
            </div>
            <div className="grow">
              <p className="font-pop-sb text-[14px]">
                {data.description !== null
                  ? data.description
                  : "## No Desscription ##"}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-grow gap-5 py-3">
            <button className="bg-income rounded-md px-4 py-1 text-[white]">
              Edit
            </button>
            <button className="rounded-md bg-[#d71919] px-4 py-1 text-[white]">
              Delete
            </button>
            <button
              onClick={() => PopModal(false)}
              className="bg-travel rounded-md px-4 py-1 text-[white]"
            >
              close me
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EntryPopup;
EntryPopup.propTypes = {
  data: PropTypes.object,
  PopModal: PropTypes.func,
};
