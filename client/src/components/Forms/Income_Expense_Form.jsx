import { useForm } from "react-hook-form";
import { FaSortDown } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiTagSimpleFill } from "react-icons/pi";
import category from "../../assets/lib/icondata.json";
import { useMemo, useState } from "react";
import capitalize from "capitalize";
import moment from "moment";
import PropTypes from "prop-types";
import { navVars } from "../../global/global-variables";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Income_Expense_Form = ({ formToDisplay }) => {
  const cat = useMemo(() => JSON.parse(JSON.stringify(category)), []);
  const catKeysASvalue = useMemo(() => Object.keys(cat), [cat]);
  const primeCategoriesVals = useMemo(
    () => Object.keys(cat).map((head) => cat[head].thisCategoryTitle),
    [cat],
  );
  const toSetSubCat = useMemo(
    () =>
      primeCategoriesVals.reduce((key, primeCategoriesVals, index) => {
        key[primeCategoriesVals] = catKeysASvalue[index];
        return key;
      }, {}),
    [primeCategoriesVals, catKeysASvalue],
  );

  const [selectedSubCats, setSeletedSubCats] = useState(false);

  const [subCats, setSubCats] = useState(() => {
    if (formToDisplay === navVars.ADD_INCOME)
      return [
        "Salary",
        "Salary Bonus",
        "Part-Time Job",
        "Freelance Work",
        "Reselling",
        "Rental Income",
        "Service Provided",
        "Loan Repaid",
        "Prize Money",
        "Loan Taken",
      ];
    else return [];
  });

  function displaySubCategiries(primeCategory) {
    if (primeCategory === "Income") {
      setSubCats();
    } else {
      const a = toSetSubCat[primeCategory];
      const c = Object.values(cat[a]).splice(2);
      setSubCats(c);
    }
  }

  console.log(subCats);

  const navigate = useNavigate();

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      formTimeStamp: moment().format(),
      userCategory: null,
      subCategory: null,
      title: null,
      description: null,
    },
  });

  const onSubmit = async (data) => {
    data.entryDate = moment(data.entryDate).format(" DD/MM/YYYY ");

    try {
      const response = await axios.post(
        formToDisplay === navVars.ADD_EXPENSE
          ? "http://127.0.0.1:8080/api/expense-form-submit"
          : "http://127.0.0.1:8080/api/income-form-submit",
        data,
      );
      alert(response.data.message);
      setSubCats(false);
      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to submit form");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* ---------------- *ANCHOR Top Bar To select Form to Display ---------------- */}
        <div className="mb-5 flex w-full">
          <button
            onClick={() =>
              navigate("/" + navVars.HOME + "/" + navVars.ADD_EXPENSE)
            }
            type="button"
            className={
              (formToDisplay === navVars.ADD_EXPENSE
                ? "bg-expense text-[white]"
                : "bg-black text-[white] hover:bg-expense") +
              " " +
              "mr-[1px] w-full rounded-l-md px-4 py-1"
            }
          >
            Expense
          </button>
          <button
            onClick={() =>
              navigate("/" + navVars.HOME + "/" + navVars.ADD_INCOME)
            }
            type="button"
            className={
              (formToDisplay === navVars.ADD_INCOME
                ? "bg-income text-[white]"
                : "bg-black text-[white] hover:bg-income") +
              " " +
              "w-full rounded-r-md px-4 py-1"
            }
          >
            Income
          </button>
        </div>
        {/* ---------------- *NOTE ##END: Top Bar To select Form to Display ---------------- */}
        {/* ---------------- *ANCHOR Form Fields ---------------- */}
        <div className="px-4">
          {/* ---------------- *ANCHOR AMOUNT Field ---------------- */}
          <div className="flex flex-col items-start font-pop-b text-[32px]">
            <label>Amount</label>
            <div className="inline-flex w-full items-center border-b-2">
              <span className="text-[18px]">
                <FaIndianRupeeSign />
              </span>
              <input
                type="number"
                onBlur={"This cannot be empty"}
                {...register("amount", {
                  required: "* This cannot be empty",
                  valueAsNumber: true,
                })}
                className="inputType-number w-full bg-[#ffffff] px-2 py-1 outline-none"
              />
              <span className="text-[18px]">INR</span>
            </div>
            {errors.amount && (
              <p className="pt-2 font-pop-i text-[12px] text-[red]">
                {errors.amount.message}
              </p>
            )}
          </div>
          {/* ----------------*NOTE ##END: AMOUNT Field ---------------- */}
          {/* ---------------- *ANCHOR TITLE Field ---------------- */}
          <div className="mt-6 flex w-full flex-col items-start gap-2 font-pop-m text-[14px]">
            <label htmlFor="Title" className="inline-flex items-center gap-2">
              <PiTagSimpleFill />
              Title
            </label>
            <input
              type="text"
              {...register("title", {})}
              className="w-full rounded-md border border-[#d1d1d1] bg-formInput px-2 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
            />
          </div>
          {/* ---------------- *NOTE ##END: TITLE Field ---------------- */}
          {/* ---------------- *ANCHOR DESCRIPTION Field ---------------- */}
          <div className="mt-4 flex w-full flex-col items-start gap-2 font-pop-m text-[14px]">
            <label
              htmlFor="Description"
              className="inline-flex items-center gap-2"
            >
              <PiTagSimpleFill />
              Description
            </label>
            <textarea
              {...register("description", {})}
              className="w-full rounded-md border border-[#d1d1d1] bg-formInput px-2 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
            />
          </div>
          {/* ---------------- *NOTE ##END: DESCRIPTION Field ---------------- */}
          <div className="mt-4 flex w-full gap-6">
            {/* ---------------- *ANCHOR DATE Field (of actal spending/income) ---------------- */}
            <div className="flex grow flex-col items-start gap-2 font-pop-m text-[14px]">
              <label htmlFor="Date" className="inline-flex items-center gap-2">
                <PiTagSimpleFill />
                {formToDisplay === navVars.ADD_EXPENSE ? "Expense" : "Income"}
                &nbsp; Date
              </label>
              <input
                type="date"
                {...register("entryDate", {
                  valueAsDate: true,
                })}
                className="w-full rounded-md border border-[#d1d1d1] bg-formInput px-2 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
              />
            </div>
            {/* ---------------- *ANCHOR Date Field (hidden)(form filled timestamp) ---------------- */}
            <input
              type="hidden"
              {...register("formTimeStamp", {
                valueAsDate: true,
              })}
            />
            {/* ---------------- *NOTE ##END: DATE Field ---------------- */}
            {/* ---------------- *ANCHOR MAIN CATEGORY Selection Field ---------------- */}
            <div className="flex grow flex-col items-start gap-2 font-pop-m text-[14px]">
              <label
                htmlFor="primeCategory"
                className="inline-flex items-center gap-2"
              >
                <PiTagSimpleFill /> Main Category
              </label>
              <div className="relative w-full">
                <select
                  defaultValue="NAN"
                  className="slectInput-arrow w-full rounded-md border border-[#d1d1d1] bg-formInput px-4 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
                  {...register("primeCategory", {
                    onChange: (e) => {
                      if (formToDisplay === navVars.ADD_INCOME) {
                        displaySubCategiries("Income");
                      } else {
                        displaySubCategiries(e.target.value);
                      }
                    },
                    validate: (fieldValue) =>
                      fieldValue === "NAN" ? "* Select a Valid Value" : true,
                  })}
                >
                  {formToDisplay === navVars.ADD_EXPENSE && (
                    <>
                      <option value={"NAN"} disabled>
                        Select a Category...
                      </option>
                      {primeCategoriesVals.map((cats) => (
                        <option key={cats} value={cats}>
                          {cats}
                        </option>
                      ))}
                    </>
                  )}

                  {formToDisplay === navVars.ADD_INCOME && (
                    <>
                      <option value={"Income"}>Income</option>
                    </>
                  )}
                </select>
                <FaSortDown className="absolute inset-y-[.3rem] right-3 text-black" />
              </div>
              {errors.primeCategory && (
                <p className="pt-2 font-pop-i text-[12px] text-[red]">
                  {errors.primeCategory.message}
                </p>
              )}
            </div>
            {/* ---------------- *NOTE ##END: MAIN CATEGORY Selection Field ---------------- */}
          </div>
          {/* ---------------- *ANCHOR SUB CATEGORY Selection Field ---------------- */}

          <div className="mt-4 flex w-full flex-col items-start gap-3 font-pop-m text-[14px]">
            {subCats.length === 0 && (
              <label className="inline-flex items-center gap-2">
                <PiTagSimpleFill /> Select a main category first ...
              </label>
            )}
            {subCats.length !== 0 && (
              <>
                <label
                  htmlFor="subCategory"
                  className="inline-flex items-center gap-2"
                >
                  <PiTagSimpleFill />
                  Sub Category
                </label>
                <input
                  type="hidden"
                  {...register("subCategory", {
                    required: "* Select a Sub Category",
                  })}
                />
                <div className="inline-flex grow flex-wrap gap-2 pb-1">
                  {subCats.map((buttons) => (
                    <button
                      type="button"
                      key={buttons}
                      onClick={() => {
                        setSeletedSubCats(buttons);
                        setValue("subCategory", buttons, {
                          shouldValidate: true,
                        });
                      }}
                      className={
                        selectedSubCats === buttons
                          ? "rounded-md bg-travel px-4 py-1 text-[white]"
                          : "rounded-md bg-black px-4 py-1 text-[white] hover:bg-travel"
                      }
                    >
                      {capitalize(buttons)}
                    </button>
                  ))}
                </div>
              </>
            )}

            {errors.subCategory && (
              <p className="pt-2 font-pop-i text-[12px] text-[red]">
                {errors.subCategory.message}
              </p>
            )}
          </div>

          {/* ---------------- *NOTE ##END: SUB CATEGORY Selection Field ---------------- */}
          {/* ---------------- *ANCHOR USER GIVEN CATEGORY Field ---------------- */}
          <div className="mt-4 flex w-full items-center gap-4 font-pop-m text-[14px]">
            <label
              htmlFor="userCategory"
              className="inline-flex items-center gap-2"
            >
              <PiTagSimpleFill />
              Other Category <span className="text-[12px]">(Optional)</span>
            </label>
            <input
              type="text"
              {...register("userCategory", {})}
              className="grow rounded-md border border-[#d1d1d1] bg-formInput px-2 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
            />
          </div>
          {/* ---------------- *NOTE ##END: USER GIVEN CATEGORY Field ---------------- */}
          {/* ---------------- *ANCHOR SUBMIT AND CANCEL Field ---------------- */}
          <div className="mt-10 flex w-full justify-end">
            {formToDisplay === navVars.ADD_EXPENSE ? (
              <button
                type="submit"
                className="mr-[1px] w-[10rem] rounded-l-md bg-expense px-4 py-1 text-[white]"
              >
                Add Expense
              </button>
            ) : (
              <button
                type="submit"
                className="mr-[1px] w-[10rem] rounded-l-md bg-income px-4 py-1 text-[white]"
              >
                Add Income
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                reset();
                setSubCats(false);
                navigate("/" + navVars.HOME);
              }}
              className="w-[10rem] rounded-r-md bg-[#da0707] px-4 py-1 text-[white]"
            >
              Cancel
            </button>
          </div>
          {/* ----------------*NOTE ##END: SUBMIT AND CANCEL Field ---------------- */}
        </div>
        {/* ----------------*NOTE ##END: Form Fields  ---------------- */}
      </form>
    </>
  );
};

Income_Expense_Form.propTypes = {
  formToDisplay: PropTypes.string,
};

export default Income_Expense_Form;
