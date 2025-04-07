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
      <div className="w-[70%] overflow-y-scroll rounded-[20px] bg-white px-[4rem] py-[2.5rem]">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {entries.length === 0 && !error && !loading && <p>Database is Empty</p>}
        {entries.length > 0 && (
          <>
            <div className="flex pb-5">
              <img className="size-[2rem]" src={dots} alt="dot-icon" />
              <h4 className="font-pop-b pl-2 text-[24px] text-black">
                Dashboard
              </h4>
            </div>
            <div className="flex gap-5 pb-2">
              <div className="mb-3 flex w-max flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
                <div>
                  <p className="font-pop-m flex items-center gap-2 text-[14px]">
                    <span className="bg-travel rounded-full p-[3px]"></span>
                    Last Year Spend
                  </p>
                </div>
                <div className="font-pop-b flex items-center text-[28px] text-[black]">
                  <span>
                    <FaIndianRupeeSign />
                  </span>
                  <span>2000</span>
                </div>
              </div>
              <div className="mb-3 flex w-max flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
                <div>
                  <p className="font-pop-m flex items-center gap-2 text-[14px]">
                    <span className="bg-travel rounded-full p-[3px]"></span>
                    Last Month Spend
                  </p>
                </div>
                <div className="font-pop-b flex items-center text-[28px] text-[black]">
                  <span>
                    <FaIndianRupeeSign />
                  </span>
                  <span>2000</span>
                </div>
              </div>
              <div className="mb-3 flex w-max flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
                <div>
                  <p className="font-pop-m flex items-center gap-2 text-[14px]">
                    <span className="bg-travel rounded-full p-[3px]"></span>
                    Last Week Spend
                  </p>
                </div>
                <div className="font-pop-b flex items-center text-[28px] text-[black]">
                  <span>
                    <FaIndianRupeeSign />
                  </span>
                  <span>2000</span>
                </div>
              </div>

              <div className="mb-3 flex w-max flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
                <div>
                  <p className="font-pop-m pb-2 text-[14px]">Trip Expense</p>
                </div>

                <button className="bg-travel rounded-md px-4 py-1 text-[white]">
                  Add Now
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
              <h4 className="font-pop-b text-[24px] text-[black]">
                Expense Entries
              </h4>
            </div>

            {entries.map((data) => (
              <div
                key={data._id}
                onClick={() => openPopup(data._id)}
                className="mb-3 flex flex-row items-center gap-5 rounded-[12px] border-[0.5px] border-[#fff] bg-white px-2 py-3 hover:border-[.5px] hover:border-[#f2f2f2] hover:bg-[#f6f6f6] hover:shadow-md"
              >
                <div>
                  <CircleIcon
                    iconName={data.subCategory}
                    iconColor={data.primeCategory}
                  />
                </div>
                <div className="grow">
                  <div className="flex items-center gap-4 pb-1">
                    <p className="font-pop-sb pr-2 text-[20px]">
                      {data.subCategory}
                    </p>
                    <p className="font-pop-m flex items-center gap-2 text-[14px]">
                      <span className="bg-travel rounded-full p-[3px]"></span>
                      {data.primeCategory}
                    </p>
                    {data.userCategory && (
                      <p className="font-pop-m flex items-center gap-2 text-[14px]">
                        <span className="bg-pupl rounded-full p-[3px]"></span>
                        {data.userCategory}
                      </p>
                    )}
                  </div>
                  <div className="font-pop-r flex items-center gap-2 text-[14px] text-[#919191]">
                    <span>{data.entryDate}</span>
                    <span>
                      <PiDotOutlineFill />
                    </span>
                    <span>{data.title}</span>
                  </div>
                </div>
                <div className="font-pop-sb flex flex-row items-center pr-2 text-[20px] text-[black]">
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
