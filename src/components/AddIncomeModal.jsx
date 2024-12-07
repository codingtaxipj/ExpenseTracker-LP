import { faFileCirclePlus, faIndianRupeeSign, faMessage, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useRef } from "react";
const AddIncomeModal = ({ closeModal, IncomeModalRef, addIncomeDataInList }) => {
    const IncomeAmountRef = useRef(null);
    const IncomeTitleRef = useRef(null);
    const IncomeDescriptionRef = useRef(null);
    const IncomeEntry = () => {
        const dataobject = {
            entryAmount: IncomeAmountRef.current.value,
            entryTitle: IncomeTitleRef.current.value,
            entryDescription: IncomeDescriptionRef.current.value,
            entryKey: Math.floor(Math.random() * 10 ** 16),
            entryType: 1,
        }
        addIncomeDataInList(dataobject);
    }
    return (
        <>
            <dialog ref={IncomeModalRef}>
                <div className="h-screen w-screen fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"  >
                    <div className="bg-[white] px-[2.5rem] py-[3rem] m-2 rounded-[2.5rem] shadow-md" >
                        <div className="flex justify-start text-[22px] mb-5">
                            <div className="text-[#0d9646]" > <FontAwesomeIcon icon={faFileCirclePlus} /></div>
                            <h4 className="font-bold ml-[1rem]" >Add Income </h4>
                        </div>
                        <div className="font-bold mb-5" >
                            <h4 className="text-[16px] mb-2 text-[#0000009d]" >Amount</h4>
                            <div className="flex gap-2 border-b-[2px] border-black pb-2" >
                                <h4 className="text-[22px] text-[#0d9646]" > <FontAwesomeIcon icon={faIndianRupeeSign} /></h4>
                                <input ref={IncomeAmountRef} type="number" name="expence" className="text-[22px] w-full input-income border-none bg-transparent focus:outline-0 px-2" />
                                <span className="text-[16px] text-[#0000009d]">INR</span>
                            </div>
                        </div>
                        <div className="font-bold mb-5" >
                            <h4 className="text-[16px] mb-2 text-[#0000009d] " >Income Title</h4>
                            <div className="flex gap-2 border-b-[2px] border-black pb-2" >
                                <h4 className="text-[22px] text-[#000000]" ><FontAwesomeIcon icon={faReceipt} /></h4>
                                <input ref={IncomeTitleRef} type="text" name="expence" className="text-[16px] font-medium w-full border-none bg-transparent focus:outline-0 px-2" />
                            </div>
                        </div>
                        <div className="font-bold mb-[2rem]" >
                            <h4 className="text-[16px] mb-2 text-[#0000009d]" >Income Description</h4>
                            <div className="flex gap-2 border-b-[2px] border-black pb-2 " >
                                <h4 className="text-[22px] text-[#000000]" ><FontAwesomeIcon icon={faMessage} /></h4>
                                <textarea ref={IncomeDescriptionRef} name="expence" className="text-[16px] font-medium border-none bg-transparent focus:outline-0 px-2 w-full h-[5rem]"></textarea>
                            </div>
                        </div>
                        <div className="flex gap-2" >
                            <button onClick={() => IncomeEntry()} className="bg-[#0d9646] text-white rounded-full px-[2rem] py-[.75rem] font-medium text-[16px]" > Add Income </button>
                            <button onClick={closeModal} className="bg-[#d61818] text-white rounded-full px-[2rem] py-[.75rem] font-medium text-[16px]" > Cancel </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
export default AddIncomeModal;
AddIncomeModal.propTypes = {
    closeModal: PropTypes.func,
    addIncomeDataInList: PropTypes.func,
    IncomeModalRef: PropTypes.any,
}
