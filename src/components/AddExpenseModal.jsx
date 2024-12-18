

import PropTypes from "prop-types";
import { useRef, useState } from "react";
const AddExpenseModal = ({
    closeModal,
    ExpenseModalRef,
    addExpenseDataInList,
}) => {
    const ExpenseAmountRef = useRef(null);
    const ExpenseTitleRef = useRef(null);
    const ExpenseDescriptionRef = useRef(null);
    let [check, updatecheck] = useState(1);
    const ExpenseEntry = () => {
        if (Number(ExpenseAmountRef.current.value) !== 0) {
            const dataobject = {
                entryAmount: Number(ExpenseAmountRef.current.value),
                entryTitle: ExpenseTitleRef.current.value,
                entryDescription: ExpenseDescriptionRef.current.value,
                entryType: 0,
            };
            addExpenseDataInList(dataobject);
            updatecheck(1);
        } else {
            updatecheck(0);
        }
    };
    return (
        <>
            <dialog ref={ExpenseModalRef}>
                <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
                    <div className="m-2 rounded-[2.5rem] bg-[white] px-[2.5rem] py-[3rem] shadow-md">
                        <div className="mb-5 flex justify-start text-[22px]">
                            <div className="text-[#d61818]">
                                {" "}
                               
                            </div>
                            <h4 className="ml-[1rem] font-bold">Add Expense </h4>
                        </div>
                        <div className="mb-5 font-bold">
                            <h4 className="mb-2 text-[16px] text-[#0000009d]">Amount</h4>
                            <div className="flex gap-2 border-b-[2px] border-black pb-2">
                                <h4 className="text-[22px] text-[#d61818]">
                                    {" "}
                                  
                                </h4>
                                <input
                                    ref={ExpenseAmountRef}
                                    type="number"
                                    name="expence"
                                    className="input-income w-full border-none bg-transparent px-2 text-[22px] focus:outline-0"
                                />
                                <span className="text-[16px] text-[#0000009d]">INR</span>
                            </div>
                        </div>
                        {check === 0 && (
                            <p className="pb-3 text-red-600">Please Enter a Amount</p>
                        )}
                        <div className="mb-5 font-bold">
                            <h4 className="mb-2 text-[16px] text-[#0000009d]">
                                Expence Title
                            </h4>
                            <div className="flex gap-2 border-b-[2px] border-black pb-2">
                                <h4 className="text-[22px] text-[#000000]">
                                   
                                </h4>
                                <input
                                    ref={ExpenseTitleRef}
                                    type="text"
                                    name="expence"
                                    className="w-full border-none bg-transparent px-2 text-[16px] font-medium focus:outline-0"
                                />
                            </div>
                        </div>
                        <div className="mb-[2rem] font-bold">
                            <h4 className="mb-2 text-[16px] text-[#0000009d]">
                                Expence Description
                            </h4>
                            <div className="flex gap-2 border-b-[2px] border-black pb-2">
                                <h4 className="text-[22px] text-[#000000]">
                                   
                                </h4>
                                <textarea
                                    ref={ExpenseDescriptionRef}
                                    name="expence"
                                    className="h-[5rem] w-full border-none bg-transparent px-2 text-[16px] font-medium focus:outline-0"
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => ExpenseEntry()}
                                className="rounded-full bg-[#d61818] px-[2rem] py-[.75rem] text-[16px] font-medium text-white"
                            >
                                {" "}
                                Add Expense{" "}
                            </button>
                            <button
                                onClick={closeModal}
                                className="rounded-full bg-[#d61818] px-[2rem] py-[.75rem] text-[16px] font-medium text-white"
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
export default AddExpenseModal;
AddExpenseModal.propTypes = {
    closeModal: PropTypes.func,
    ExpenseModalRef: PropTypes.any,
    addExpenseDataInList: PropTypes.func,
};
