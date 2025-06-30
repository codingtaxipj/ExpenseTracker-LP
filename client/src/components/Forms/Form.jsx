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
    : getSubOfPrime(selectedPrimeCat);

  const updateRepeating = (newValues) => {
    const prev = getValues("isTransactionRepeating") || {};

    setValue("isTransactionRepeating", {
      ...prev,
      ...newValues,
    });
  };

  const updateTrip = (newValues) => {
    const prev = getValues("isTransactionTrip") || {};

    setValue("isTransactionTrip", {
      ...prev,
      ...newValues,
    });
  };

  //NOTE for setting Trip or Repeating Transaction type
  const [selectedFormFor, setSelectedFormFor] = useState(null);
  const handleCheckedFormFor = (check) => {
    if (selectedFormFor === check) {
      setSelectedFormFor(null);
      setSelectedRepeatBy(null);
      setValue("isTransactionRepeating", { value: false });
      setValue("isTransactionTrip", { value: false });
      return; // ⬅️ prevent the rest from running
    }

    setSelectedFormFor(check);
    setSelectedRepeatBy(null);

    if (check === "trip") {
      updateTrip({ value: true });
      setValue("isTransactionRepeating", { value: false });
    }
    if (check === "repeat") {
      setValue("isTransactionTrip", { value: false });
      updateRepeating({ value: true });
    }
  };

  //NOTE for setting repeating payment is by month or year
  const [selectedRepeatBy, setSelectedRepeatBy] = useState(null);
  const handleSelectedRepeatBy = (check) => {
    if (selectedRepeatBy === check) {
      setSelectedRepeatBy(null); // uncheck if already selected
    } else {
      setSelectedRepeatBy(check);
    }
    check === "month" && updateRepeating({ by: "month" });
    check === "year" && updateRepeating({ by: "year" });
  };

  //NOTE if payemt is trip then select trip
  const handleIfTrip = (trip) => {
    if (trip) updateTrip({ TripID: trip });
  };

  //NOTE if payemt is repeat by month or year then select date
  const handleRepeatDate = (date) => {
    if (date) updateRepeating({ date: date });
  };

  //NOTE if payemt is repeat by year then select month
  const handleRepeatMonth = (month) => {
    if (month) updateRepeating({ month: month });
  };

  //NOTE : react from hook initalize
  const {
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transactionTimestamp: moment().format(),
      onDate: moment().format(),
      isTransationExpense: isExpense ? true : false,
      isTransactionRepeating: { value: false },
      isTransactionTrip: { value: false },
    },
  });

  //NOTE : form handle submit function
  const onSubmit = async (data) => {
    const { isDescription } = data;
    if (!isDescription || isDescription.trim().length === 0)
      data.isDescription = false;

    console.log(data);

    /* try {
      const response = await axios.post(
        "http://127.0.0.1:8080/expense/add-data",
        data,
      );
      alert(response.data.message);
      reset();
    } catch (error) {
      console.error(error);
      const errorMeaage = error.response.data.message || "Submittion Error";
      alert(errorMeaage);
    } */
  };

  return (
    <>
      <div className="text-14 font-medium">
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            /** NOTE [HIDDEN] field to identify type if form is expense or income */
            <input type="hidden" {...register("isTransationExpense")} />
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
            <FieldLabel htmlFor="Amount" label="Amount" />
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
            <FieldLabel htmlFor="Note" label="Note" />
            <textarea
              className="focus-visible:border-ring focus-visible:ring-gradBot border-br1 w-full rounded-md border p-2 outline-none focus-visible:ring-[1px]"
              placeholder="Transaction Note..."
              {...register("isDescription")}
            />
          </FormField>
          {/**ANCHOR ##END: DESCRIPTION Field ---------------- */}

          {/**ANCHOR DATE Field ---------------- */}
          <FormField>
            <FieldLabel htmlFor="Date" label="Date" />
            <SelectDate valVar="onDate" setValue={setValue}></SelectDate>
          </FormField>
          {/**ANCHOR ##END: DATE Field ---------------- */}

          {/**ANCHOR MAIN CATEGORY Field ---------------- */}
          <FormField>
            <FieldLabel htmlFor="primeCategory" label="Main Category" />
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
            <FieldLabel htmlFor="subCategory" label=" Sub Category" />
            {listOfSubCat === null && (
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

          {/**ANCHOR TRIP or Repeating Payment Select Field */}
          <FormField>
            <div className="flex gap-5">
              <FieldLabel htmlFor="subCategory" label=" Mark Expense as" />
              <div className="flex items-center gap-2">
                <Checkbox
                  className={
                    "data-[state=checked]:bg-pupl border-dimText hover:cursor-pointer"
                  }
                  checked={selectedFormFor === "trip"}
                  onCheckedChange={() => handleCheckedFormFor("trip")}
                ></Checkbox>
                <span>Trip Expense</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  className={
                    "data-[state=checked]:bg-pupl border-dimText hover:cursor-pointer"
                  }
                  checked={selectedFormFor === "repeat"}
                  onCheckedChange={() => handleCheckedFormFor("repeat")}
                ></Checkbox>
                <span>Repeating Expense</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  className={
                    "data-[state=checked]:bg-pupl border-dimText hover:cursor-pointer"
                  }
                  checked={selectedFormFor === null}
                  onCheckedChange={() => handleCheckedFormFor(null)}
                ></Checkbox>
                <span>None</span>
              </div>
            </div>
          </FormField>
          {/**ANCHOR ##END: TRIP or Repeating Payment Select Field */}

          {/**ANCHOR if TRIP Selected  */}
          {selectedFormFor === "trip" && (
            <FormField>
              <div className="flex gap-5">
                <OuterBar>
                  <SelectCard isExpense title={"Select Trip"}>
                    <SelectFilter
                      placeholder={"Select Trip"}
                      onValueChange={handleIfTrip}
                      list={[2024, 2025, 2026]}
                    ></SelectFilter>
                  </SelectCard>
                </OuterBar>
              </div>
            </FormField>
          )}
          {/**ANCHOR ##END:if TRIP Selected */}

          {/**ANCHOR if Repeating Payment Selected  */}
          {selectedFormFor === "repeat" && (
            <FormField>
              <div className="flex gap-5">
                <div className="flex"> Repeat Every </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    className={
                      "data-[state=checked]:bg-pupl border-dimText hover:cursor-pointer"
                    }
                    checked={selectedRepeatBy === "month"}
                    onCheckedChange={() => handleSelectedRepeatBy("month")}
                  ></Checkbox>
                  <span>Month</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    className={
                      "data-[state=checked]:bg-pupl border-dimText hover:cursor-pointer"
                    }
                    checked={selectedRepeatBy === "year"}
                    onCheckedChange={() => handleSelectedRepeatBy("year")}
                  ></Checkbox>
                  <span>Year</span>
                </div>
              </div>
            </FormField>
          )}
          {/**ANCHOR ##END:if Repeating Payment Selected */}

          {/**ANCHOR Repeating Payment BY MONTH or YEAR */}
          <FormField>
            {selectedRepeatBy !== null && (
              <OuterBar>
                {(selectedRepeatBy === "month" ||
                  selectedRepeatBy === "year") && (
                  <SelectCard isExpense title={"Select Date"}>
                    <SelectFilter
                      placeholder={"Date"}
                      onValueChange={handleRepeatDate}
                      list={[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
                      ]}
                    />
                  </SelectCard>
                )}
                {selectedRepeatBy === "year" && (
                  <SelectCard isExpense title={"Select Month"}>
                    <SelectFilter
                      placeholder={"Month"}
                      onValueChange={handleRepeatMonth}
                      isMonthSelect
                      list={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                    />
                  </SelectCard>
                )}
              </OuterBar>
            )}
          </FormField>
          {/**ANCHOR ##END:Repeating Payment BY MONTH or YEAR */}

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
            fromYear={2020}
            toYear={new Date().getFullYear() + 1}
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
export const FieldLabel = ({ htmlFor, label }) => {
  return (
    <label htmlFor={htmlFor} className="inline-flex items-center gap-2">
      <Icons.formlabel />
      {label}
    </label>
  );
};

export const ErrorField = ({ error }) => {
  return <>{error && <p className="text-12 text-rr">{error.message}</p>}</>;
};
