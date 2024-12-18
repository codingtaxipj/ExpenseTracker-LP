import PropTypes from "prop-types";
import { useRef, useState } from "react";
const AddIncomeModal = ({
  closeModal,
  IncomeModalRef,
  addIncomeDataInList,
}) => {
  const IncomeAmountRef = useRef(null);
  const IncomeTitleRef = useRef(null);
  const IncomeDescriptionRef = useRef(null);
  let [check, updatecheck] = useState(1);
  const IncomeEntry = () => {
    if (Number(IncomeAmountRef.current.value) !== 0) {
      const dataobject = {
        entryAmount: Number(IncomeAmountRef.current.value),
        entryTitle: IncomeTitleRef.current.value,
        entryDescription: IncomeDescriptionRef.current.value,
        entryType: 1,
      };
      addIncomeDataInList(dataobject);
      updatecheck(1);
    } else {
      updatecheck(0);
    }
  };
  return (
    <>
      <dialog ref={IncomeModalRef}>
        <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="m-2 rounded-[2.5rem] bg-[white] px-[2.5rem] py-[3rem] shadow-md">
            <div className="mb-5 flex justify-start text-[22px]">
              <div className="text-[#0d9646]"> </div>
              <h4 className="ml-[1rem] font-bold">Add Income </h4>
            </div>
            <div className="mb-5 font-bold">
              <h4 className="mb-2 text-[16px] text-[#0000009d]">Amount</h4>
              <div className="flex gap-2 border-b-[2px] border-black pb-2">
                <h4 className="text-[22px] text-[#0d9646]"> </h4>
                <input
                  ref={IncomeAmountRef}
                  type="number"
                  name="expence"
                  className="input-income bg-transparent w-full border-none px-2 text-[22px] focus:outline-0"
                />
                <span className="text-[16px] text-[#0000009d]">INR</span>
              </div>
            </div>
            {check === 0 && (
              <p className="text-red-600 pb-3">Please Enter a Amount</p>
            )}
            <div className="mb-5 font-bold">
              <h4 className="mb-2 text-[16px] text-[#0000009d]">
                Income Title
              </h4>
              <div className="flex gap-2 border-b-[2px] border-black pb-2">
                <h4 className="text-[22px] text-[#000000]"></h4>
                <input
                  ref={IncomeTitleRef}
                  type="text"
                  name="expence"
                  className="bg-transparent w-full border-none px-2 text-[16px] font-medium focus:outline-0"
                />
              </div>
            </div>
            <div className="mb-[2rem] font-bold">
              <h4 className="mb-2 text-[16px] text-[#0000009d]">
                Income Description
              </h4>
              <div className="flex gap-2 border-b-[2px] border-black pb-2">
                <h4 className="text-[22px] text-[#000000]"></h4>
                <textarea
                  ref={IncomeDescriptionRef}
                  name="expence"
                  className="bg-transparent h-[5rem] w-full border-none px-2 text-[16px] font-medium focus:outline-0"
                ></textarea>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => IncomeEntry()}
                className="text-white rounded-full bg-[#0d9646] px-[2rem] py-[.75rem] text-[16px] font-medium"
              >
                {" "}
                Add Income{" "}
              </button>
              <button
                onClick={closeModal}
                className="text-white rounded-full bg-[#d61818] px-[2rem] py-[.75rem] text-[16px] font-medium"
              >
                {" "}
                Cancel{" "}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default AddIncomeModal;
AddIncomeModal.propTypes = {
  closeModal: PropTypes.func,
  addIncomeDataInList: PropTypes.func,
  IncomeModalRef: PropTypes.any,
};
