import moment from "moment";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// global variables
import { PATH } from "@/router/routerConfig";

//Shacdn-UI
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Checkbox } from "../ui/checkbox";
import OuterBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import { Icons } from "../icons";
import ExpButton from "../custom-ui/expButton";
import {
  expenseCategories,
  getPrimeCategories,
  getSubOfPrime,
  incomeCategories,
} from "@/global/categories";

const Form = ({ isExpense, isIncome }) => {
  //NOTE page navigation
  const navigate = useNavigate();
  const location = useLocation();

  // NOTE desengemnting path so that parent path remain constant no matter where my form displays
  const desegmentPath = () => {
    const currentPath = location.pathname;
    const segments = currentPath.split("/").filter(Boolean);
    segments.pop();
    const parentPath = "/" + segments.join("/");
    return parentPath;
  };
  const handleCancel = () => {
    const goToPath = desegmentPath();
    navigate(goToPath);
  };
  const navigateToIncome = () => {
    const Path = desegmentPath();
    const incomePath = Path + "/" + PATH.addIncome;
    navigate(incomePath);
  };
  const navigateToExpense = () => {
    const Path = desegmentPath();
    const incomePath = Path + "/" + PATH.addExpense;
    navigate(incomePath);
  };

  //NOTE Category states
  const [selectedPrimeCat, setSelectedPrimeCat] = useState(null);
  const [selectedSubCat, setSelectedSubCat] = useState(null);

  // NOTE will handle the selected prime for expense to dsiplay its sub categories
  const handleSelectExpensePrime = (value) => {
    setValue("primeCategory", value, { shouldValidate: true });
    setSelectedPrimeCat(value);
  };
  const handleSelectIncomePrime = () => {
    setValue("primeCategory", "Income", { shouldValidate: true });
    setSelectedPrimeCat("Income");
  };

  //NOTE get prime categories
  const listOfPrimeCats = isExpense
    ? getPrimeCategories(expenseCategories)
    : getPrimeCategories(incomeCategories);

  //NOTE get sub cat of selected prime cat
  const listOfSubCat = isExpense
    ? getSubOfPrime(selectedPrimeCat, isExpense) || null
    : getSubOfPrime(selectedPrimeCat) || null;

  //NOTE : react from hook initalize
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userID: 123456,
      transactionTimestamp: moment().format(),
      onDate: moment().format(),
      isTransactionExpense: isExpense ? true : false,
      isTransactionRepeating: { valid: false },
      isTransactionTrip: { valid: false },
    },
  });

  //NOTE : form handle submit function
  const onSubmit = async (data) => {
    const { isExpenseNote, onDate, transactionTimestamp } = data;
    if (!isExpenseNote || isExpenseNote.trim().length === 0)
      data.isExpenseNote = "";
    data.onDate = moment(onDate).toISOString();
    data.transactionTimestamp = moment(transactionTimestamp).toISOString();

    console.log("Sending data:", data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/expense/add-data",
        data,
      );
      alert(response.data.message);
      reset();
    } catch (error) {
      if (error.response) {
        console.error("Validation Error:", error.response.data.errors);
        alert(
          error.response.data?.errors?.[0]?.msg ||
            error.response.data?.message ||
            "Form submission failed.",
        );
      } else {
        console.error("Unknown Axios Error:", error.message);
        alert("Network or unknown error.");
      }
    }
  };

  //NOTE - form label icon color
  const formLabelIconColor =
    (isExpense && "text-exp") || (isIncome && "text-inc");

  return (
    <>
      <div className="text-14 font-medium">
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            /** NOTE [HIDDEN] field to identify type if form is expense or income */
            <input type="hidden" {...register("isTransactionExpense")} />
          }

          {/** ANCHOR select form for inc or exp ---------------- */}
          <FormField>
            <div className="flex gap-2">
              <ExpButton
                onClick={() => navigateToExpense()}
                type="button"
                btnfor={isExpense ? "expense" : "expenseInactive"}
                label="Expense"
                className="w-1/2"
              />
              <ExpButton
                onClick={() => navigateToIncome()}
                type="button"
                btnfor={isIncome ? "income" : "incomeInactive"}
                label="Income"
                className="w-1/2"
              />
            </div>
          </FormField>
          {/**ANCHOR ##END: select form for inc or exp ---------------- */}

          {/**ANCHOR AMOUNT Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="Amount"
              label="Amount"
            />
            <div className="border-br1 inline-flex w-full items-center border-b-1 font-bold">
              <Icons.rupee className="text-[18px]" />
              <input
                className="inputType-number text-24 w-full rounded-md border-none px-3 py-1 outline-none"
                type="number"
                onBlur={"This cannot be empty"}
                {...register("ofAmount", {
                  required: "* Amount cannot be empty",
                  valueAsNumber: true,
                })}
              />
              <span className="text-[18px]">INR</span>
            </div>
            <ErrorField error={errors.ofAmount} />
          </FormField>
          {/**ANCHOR ##END: AMOUNT Field ---------------- */}

          {/**ANCHOR NOTE Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="Note"
              label="Note"
            />
            <textarea
              className="focus-visible:border-ring focus-visible:ring-gradBot border-br1 w-full rounded-md border p-2 outline-none focus-visible:ring-[1px]"
              placeholder="Transaction Note..."
              {...register("isExpenseNote")}
            />
          </FormField>
          {/**ANCHOR ##END: DESCRIPTION Field ---------------- */}

          {/**ANCHOR DATE Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="Date"
              label="Date"
            />
            <SelectDate valVar="onDate" setValue={setValue}></SelectDate>
          </FormField>
          {/**ANCHOR ##END: DATE Field ---------------- */}

          {/**ANCHOR MAIN CATEGORY Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="primeCategory"
              label="Main Category"
            />
            <OuterBar>
              <SelectCard isExpense={isExpense} title={"Select Main Category"}>
                {isExpense && (
                  <SelectFilter
                    placeholder={"Select"}
                    onValueChange={handleSelectExpensePrime}
                    list={listOfPrimeCats}
                  ></SelectFilter>
                )}
                {isIncome && (
                  <SelectFilter
                    placeholder={"Select"}
                    onValueChange={handleSelectIncomePrime}
                    list={listOfPrimeCats}
                  ></SelectFilter>
                )}
              </SelectCard>
            </OuterBar>
          </FormField>

          <input
            type="hidden"
            {...register("primeCategory", {
              required: "* Select a Prime Category",
            })}
          />

          <ErrorField error={errors.primeCategory} />
          {/* ANCHOR ##END: MAIN CATEGORY Field ---------------- */}

          {/**ANCHOR SUB CATEGORY Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="subCategory"
              label=" Sub Category"
            />
            {selectedPrimeCat === null && (
              <span>Select a main category first ...</span>
            )}
            {listOfSubCat !== null && (
              <>
                <div className="inline-flex flex-wrap gap-2">
                  {listOfSubCat.map((buttons) => (
                    <ExpButton
                      type="button"
                      btnfor={
                        isExpense
                          ? selectedSubCat === buttons
                            ? "expense"
                            : "expenseInactive"
                          : selectedSubCat === buttons
                            ? "income"
                            : "incomeInactive"
                      }
                      onClick={() => {
                        setValue("subCategory", buttons, {
                          shouldValidate: true,
                        });
                        setSelectedSubCat(buttons);
                      }}
                      label={buttons}
                      key={buttons}
                    ></ExpButton>
                  ))}
                </div>
              </>
            )}

            <input
              type="hidden"
              {...register("subCategory", {
                required: "* Sub Category is Required",
              })}
            />

            <ErrorField error={errors.subCategory} />
          </FormField>
          {/**ANCHOR ##END: SUB CATEGORY Field ---------------- */}

          {/**ANCHOR SUBMIT & CANCEL Buttons ---------------- */}
          <FormField className="items-end">
            <div className="flex gap-2">
              {isExpense ? (
                <ExpButton type="submit" btnfor="expense" label={"Add Now"} />
              ) : (
                <ExpButton type="submit" btnfor="income" label={"Add Now"} />
              )}
              <ExpButton
                onClick={() => {
                  reset();
                  handleCancel();
                }}
                type="button"
                btnfor="cancel"
                label={"Cancel"}
              />
            </div>
          </FormField>
          {/**ANCHOR ##END: SUBMIT & CANCEL Buttons ---------------- */}
        </form>
      </div>
    </>
  );
};

export default Form;

export const SelectDate = ({ setValue, valVar }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "border-br1 w-full justify-between border bg-transparent text-left hover:bg-transparent hover:text-white",
              !date && "text-muted-foreground",
            )}
          >
            {date ? date.toLocaleDateString() : "Select a date"}
            <Icons.dayCal />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            fromYear={new Date().getFullYear() - 5}
            toYear={new Date().getFullYear() + 5}
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setValue(valVar, selectedDate);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export const FormField = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col gap-2 py-4 ${className}`}>{children}</div>
  );
};
export const FieldLabel = ({ htmlFor, label, iconColor = "text-white" }) => {
  return (
    <label htmlFor={htmlFor} className="inline-flex items-center gap-2">
      <Icons.formlabel className={`${iconColor}`} />
      {label}
    </label>
  );
};

export const ErrorField = ({ error }) => {
  return <>{error && <p className="text-12 text-rr">{error.message}</p>}</>;
};
