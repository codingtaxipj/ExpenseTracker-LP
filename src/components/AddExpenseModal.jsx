import { faFileCircleMinus, faIndianRupeeSign, faMessage, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
const AddExpenseModal = ({ closeModal, ExpenseModalRef }) => {
    return (
        <>
            <dialog ref={ExpenseModalRef}>
                <div className="h-screen w-screen fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"  >
                    <div className="bg-[white] px-[2.5rem] m-2 py-[3rem] rounded-[2.5rem] shadow-md" >
                        <div className="flex justify-start text-[22px] mb-5">
                            <div className="text-[#d61818]" > <FontAwesomeIcon icon={faFileCircleMinus} /></div>
                            <h4 className="font-bold ml-[1rem]" >Add Expense </h4>
                        </div>
                        <div className="font-bold mb-5" >
                            <h4 className="text-[16px] mb-2 text-[#0000009d]" >Amount</h4>
                            <div className="flex gap-2 border-b-[2px] border-black pb-2" >
                                <h4 className="text-[22px] text-[#d61818]" > <FontAwesomeIcon icon={faIndianRupeeSign} /></h4>
                                <input type="number" name="expence" className="text-[22px] w-full input-income border-none bg-transparent focus:outline-0 px-2" />
                                <span className="text-[16px] text-[#0000009d]">INR</span>
                            </div>
                        </div>
                        <div className="font-bold mb-5" >
                            <h4 className="text-[16px] mb-2 text-[#0000009d] " >Expence Title</h4>
                            <div className="flex gap-2 border-b-[2px] border-black pb-2" >
                                <h4 className="text-[22px] text-[#000000]" ><FontAwesomeIcon icon={faReceipt} /></h4>
                                <input type="text" name="expence" className="text-[16px] font-medium w-full border-none bg-transparent focus:outline-0 px-2" />
                            </div>
                        </div>
                        <div className="font-bold mb-[2rem]" >
                            <h4 className="text-[16px] mb-2 text-[#0000009d]" >Expence Description</h4>
                            <div className="flex gap-2 border-b-[2px] border-black pb-2 " >
                                <h4 className="text-[22px] text-[#000000]" ><FontAwesomeIcon icon={faMessage} /></h4>
                                <textarea name="expence" className="text-[16px] font-medium border-none bg-transparent focus:outline-0 px-2 w-full h-[5rem]"></textarea>
                            </div>
                        </div>
                        <div className="flex gap-2" >
                            <button className="bg-[#d61818] text-white rounded-full px-[2rem] py-[.75rem] font-medium text-[16px]" > Add Expense </button>
                            <button onClick={closeModal} className="bg-[#d61818] text-white rounded-full px-[2rem] py-[.75rem] font-medium text-[16px]" > Cancel </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
export default AddExpenseModal;
AddExpenseModal.propTypes = {
    closeModal: PropTypes.func,
    ExpenseModalRef: PropTypes.any,
}