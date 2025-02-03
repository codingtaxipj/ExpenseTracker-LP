import { useState, useEffect } from "react";
import axios from "axios";
import { PiDotOutlineFill } from "react-icons/pi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import dots from "../../assets/4dots.svg";
import CircleIcon from "../CircleIcon"; // Import your custom icon component
import EntryPopup from "../Entry_Popup";

const ExpenseIndex = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [popModal, setPopModal] = useState(false);
  const [popData, setPopData] = useState([]);

  useEffect(() => {
    // Fetch data on component mount
    axios
      .get("http://127.0.0.1:8080/api/get-expenseData") // Replace with your API URL
      .then((response) => {
        setEntries(response.data); // Set fetched data to state
        setLoading(false); // Turn off loading
      })
      .catch((err) => {
        setError(err.message); // Handle error
        setLoading(false); // Turn off loading
      });
  }, []);

  function openPopup(id) {
    const selected = entries.find((data) => data._id === id);
    if (selected) {
      setPopData(selected);
      setPopModal(true);
    } else {
      console.warn("No matching entry found for ID:", id);
    }
  }

  /*    {popModal && (
        <EntryPopup PopModal={setPopModal} data={popData}></EntryPopup>
      )}  */

  return (
    <>
      <div className="bg-white w-[70%] rounded-[20px] px-[4rem] py-[2.5rem]">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {entries.length === 0 && !error && !loading && <p>Database is Empty</p>}
        {entries.length > 0 && (
          <>
            <div className="flex flex-row items-center justify-start pb-2">
              <img className="size-[2rem]" src={dots} alt="dot-icon" />
              <h4 className="pl-2 font-pop-b text-[24px] text-black">
                Dashboard
              </h4>
            </div>
            <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4 pt-10">
              <h4 className="font-pop-b text-[24px] text-[black]">
                Expense Entries
              </h4>
            </div>

            {entries.map((data) => (
              <div
                key={data._id}
                onClick={() => openPopup(data._id)}
                className="bg-white mb-3 flex flex-row items-center gap-5 rounded-[12px] border-[0.5px] border-[#fff] px-2 py-3 hover:border-[.5px] hover:border-[#f2f2f2] hover:bg-[#f6f6f6] hover:shadow-md"
              >
                <div>
                  <CircleIcon
                    iconName={data.subCategory}
                    iconColor={data.primeCategory}
                  />
                </div>
                <div className="grow">
                  <div className="flex items-center gap-4 pb-1">
                    <p className="pr-2 font-pop-sb text-[20px]">
                      {data.subCategory}
                    </p>
                    <p className="flex items-center gap-2 font-pop-m text-[14px]">
                      <span className="rounded-full bg-travel p-[3px]"></span>
                      {data.primeCategory}
                    </p>
                    {data.userCategory && (
                      <p className="flex items-center gap-2 font-pop-m text-[14px]">
                        <span className="rounded-full bg-pupl p-[3px]"></span>
                        {data.userCategory}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 font-pop-r text-[14px] text-[#919191]">
                    <span>{data.entryDate}</span>
                    <span>
                      <PiDotOutlineFill />
                    </span>
                    <span>{data.title}</span>
                  </div>
                </div>
                <div className="flex flex-row items-center pr-2 font-pop-sb text-[20px] text-[black]">
                  <span>
                    <FaIndianRupeeSign />
                  </span>
                  <span>{data.amount}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div>
        {popModal && (
          <EntryPopup PopModal={setPopModal} data={popData}></EntryPopup>
        )}
      </div>
    </>
  );
};

export default ExpenseIndex;
