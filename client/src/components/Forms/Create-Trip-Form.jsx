import { useForm } from "react-hook-form";
import { Icons } from "../icons";
import Flexcol from "../section/flexcol";
import Flexrow from "../section/flexrow";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getCodeOf, getCountryNames } from "@/global/countries";
import { useDispatch } from "react-redux";
import numeral from "numeral";
import EButton from "../buttons/eButton";
import { insertTrip } from "@/redux/slices/trip-slice";
import VerticalDevider from "../strips/vertical-devider";
import { SelectDate } from "./Form";
import { Checkbox } from "../ui/checkbox";
import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import HorizontalDivider from "../strips/horizontal-divider";
import { cardBg, cardBgv2 } from "@/global/style";
import ExpButton from "../buttons/exp-button";

const CreateTripForm = () => {
  /**
   * ====================================
   *  @function dispatch
   * ====================================
   */
  const dispatch = useDispatch();

  /**
   * ====================================
   * @function states
   * ====================================
   */
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [triptype, setTriptype] = useState(0);
  const [grouptype, setGrouptype] = useState(0);
  const [CCdata, setCCdata] = useState(null);

  /**
   * ====================================
   *  @function react-hook-form
   * ====================================
   */
  //NOTE - react-hook-form
  const { register, setValue, getValues, reset } = useForm({
    defaultValues: {
      userID: 123456,
      isInternational: null,
      ofGroup: 1,
      tripTotal: 0,
      tripTitle: "",
    },
  });

  /**
   * ====================================
   * @function useffect
   * NOTE - assigns values to form inputs
   * ====================================
   */
  // NOTE - form values to assign on change
  useEffect(() => {
    setValue("travelType", grouptype, { shouldValidate: true });
    setValue("tripType", triptype, { shouldValidate: true });
    setValue("abroadInfo", CCdata, { shouldValidate: true });
  });

  const resetValues = () => {
    setStep(() => 1);
    setTriptype(0);
    setGrouptype(0);
    setCCdata(null);
    setErrors({});
    reset(undefined, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
    });
    console.log({ step });
  };

  /**
   * ====================================
   * @function next
   * NOTE - moves to next step. also manually check values for error and call submit at the end
   * ====================================
   */
  const next = () => {
    // NOTE - calls the values of form inputs
    const values = getValues();
    const newErrors = {};
    console.log({ grouptype });
    console.log("tt", values.tripTitle);
    if (step == 1) {
      /**
       * ====================================
       * NOTE - at STEP 1
       * -- checks --
       * -- 1. if trip title is given or not
       * ====================================
       */
      if (
        !values.tripTitle ||
        values.tripTitle.trim() === "" ||
        values.tripTitle == undefined
      ) {
        newErrors.tripTitle = "*Trip title is required";
      }
    } else if (step == 2) {
      /**
       * ====================================
       * NOTE - at STEP 2
       * -- checks --
       * -- 1 . if start and end dates are given or not
       * -- 2 . if end date is same or in future to start date
       * ====================================
       */
      if (!values.startOn) {
        newErrors.startOn = "Start date is required";
      }
      if (!values.endsOn) {
        newErrors.endsOn = "End date is required";
      } else if (
        values.startOn &&
        new Date(values.endsOn) < new Date(values.startOn)
      ) {
        newErrors.endsOn = "End date cannot be before start date";
      }
    } else if (step == 3) {
      /**
       * ====================================
       * NOTE - at STEP 3
       * -- checks --
       * -- 1 . if on selecting international trip country data like
       * -- name / currency / code / rate
       * -- are generation or not
       * ====================================
       */
      if (values.tripType == 1) {
        if (!CCdata) {
          newErrors.CCdata =
            "Country details are required for international trips";
        }
      }
    } else if (step == 4) {
      /**
       * ====================================
       * NOTE - at STEP 4
       * -- checks --
       * -- 1 . on selecting traveling with group
       * -- No. of Members/Groups given shud be >= 1
       * --
       * NOTE - at step 4 if no error then submits the data on clicking submit
       * ====================================
       */
      values.ofGroup = Number(values.ofGroup);
      if (values.travelType === 2 || values.travelType === 3) {
        if (values.ofGroup < 1) {
          newErrors.ofGroup = "Group/Members size must be at least 1";
        } else {
          submit(values);
        }
      } else {
        submit(values);
      }
    }

    /**
     * ====================================
     * @function setErrors
     * NOTE - sets error generated to page
     * NOTE - if no error then
     * -- 1. at step 1 open dialoge box
     * @function setSteps
     * NOTE - if step < 4
     * -- 2. incriment step count
     * ====================================
     */
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (step == 1) {
        setOpen(true);
      }
      if (step < 4) setStep((s) => s + 1);
    }
  };

  /**
   * ====================================
   * @function back
   * NOTE - calls function setStep
   * -- 1. moves to previous step section
   * -- 2. decriment step count
   * -- 3. if step == 1 then close dialog box
   * ====================================
   */

  const back = () =>
    setStep((s) => {
      let on = s - 1;
      if (on === 1) setOpen(false);
      return on;
    });

  /**
   * ====================================
   * @function submit
   * NOTE - if form values has no errors
   * -- 1. calls @function insertTrip
   * -- 2. inserts data in DB and return message
   * -- 3. toast the success / error message
   * ====================================
   */
  const submit = async (data) => {
    console.log("data", data);

    try {
      const result = await dispatch(insertTrip({ data })).unwrap();

      toast.success("Success", {
        description: result.message,
        action: {
          label: "Ok!",
          onClick: () => {
            setOpen(false);
            resetValues();
          },
        },
      });
    } catch (errMessage) {
      toast.error("Error", {
        description: errMessage,
        action: {
          label: "Ok!",
          onClick: () => setOpen(true),
        },
      });
    }
  };

  /**
   * ====================================
   * @function handleTripType
   * NOTE - sets trip type state via @function setTriptype
   * -- 0 = Domestic
   * -- 1 = International
   * ====================================
   */
  const handleTripType = (index) => {
    if (triptype === index) {
      setTriptype(0);
      // uncheck if already selected
    } else {
      setTriptype(index);
    }

    if (index === 0) setCCdata(null);
  };

  /**
   * ====================================
   * @function handleGroupType
   * NOTE - sets traveling with type state via @function setGrouptype
   * -- 0 = solo
   * -- 1 = family
   * -- 2 = group
   * -- 3 = family group
   * ====================================
   */
  const handleGroupType = (index) => {
    if (grouptype === index) {
      setGrouptype(0);
      // uncheck if already selected
    } else {
      setGrouptype(index);
    }
  };

  /**
   * ====================================
   * @function handleSelectCountry
   * NOTE - get exchange rate data of selected country
   * -- 1. base is by default INR
   * -- 2. then make obj {country name / currency / code / rate}
   * -- 3. calls state @function setCCdata to set data
   * ====================================
   */
  const handleSelectCountry = async (c) => {
    const country = getCodeOf(c);
    const base = country.currencyCode.toLowerCase();
    const res = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`,
    );
    const data = await res.json();
    const result = {
      country: country.name,
      currency: country.currency,
      currencyCode: country.currencyCode,
      rate: data[base]["inr"] ?? null,
    };

    setCCdata(result);
  };

  /**
   * =============================================================
   * *ANCHOR COMPONENT RETURN
   * ==============================================================
   */

  return (
    <>
      <Flexcol
        className={cn("h-max w-full p-8", cardBg, "from-trip-a1 to-trip-a3")}
      >
        <Flexrow className="text-18px text-dark-a2 items-center gap-2 font-medium">
          <Icons.trip />
          <span>Trip Title ?</span>
        </Flexrow>
        <Flexrow className="border-dark-a2 items-center border-b-1">
          <input type="hidden" {...register("userID")} />
          <input type="hidden" {...register("isInternational")} />
          <input type="hidden" {...register("tripTotal")} />
          {/**
           * ===========================
           * ANCHOR trip title
           * ===========================
           */}
          <input
            className="text-24px placeholder:text-slate-a1/70 w-full rounded-md border-none px-1 py-1 font-bold outline-none"
            type="text"
            placeholder="Himalayan Adventure ..."
            {...register("tripTitle")}
          />
        </Flexrow>
        {/* ========= trip title ERROR HANDLER ========= */}
        <ErrorFieldTrip className={"text-dark-a2"} error={errors.tripTitle} />
        {/* ========= create trip button ========= */}
        <Flexrow className="justify-end">
          <ExpButton
            onClick={() => {
              next();
            }}
            custom_textbtn
            className={"text-trip-a4 bg-dark-a2"}
          >
            <Icons.add_plus className="text-18px" />
            <span className="text-14px">Create Trip</span>
          </ExpButton>
        </Flexrow>
      </Flexcol>

      {/**
       * ===========================
       * ANCHOR Dialog Box Begins
       * ===========================
       */}
      {open && (
        <>
          <Flexrow className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
            <Flexcol
              className={cn(
                "relative h-[450px] w-[700px] justify-between gap-2.5 p-10",
                cardBgv2,
              )}
            >
              {/**
               * ===========================
               * ANCHOR Dialog Box - section 1
               * ===========================
               */}

              <Flexcol>
                {/*========= title and close button  */}
                <Flexrow className={"items-center justify-between"}>
                  <span className="text-14px">
                    {step == 2 && "Select Dates"}
                    {step == 3 && "Select Desination"}
                    {step == 4 && "How you are Traveling ?"}
                  </span>
                  <ExpButton
                    onClick={() => {
                      resetValues();
                      setOpen(false);
                    }}
                    custom_iconbtn
                    className={"p-2.5"}
                  >
                    <Icons.cross className="text-18px hover:text-trip-a4" />
                  </ExpButton>
                </Flexrow>
                {/*========= step indicator ========= */}
                <Flexrow className={"items-center gap-1"}>
                  {[1, 2, 3, 4].map((s) => (
                    <>
                      <StepRing className={step >= s && "border-trip-a2"}>
                        <StepCircle
                          className={
                            step >= s && "bg-trip-a2 text-dark-a2 font-medium"
                          }
                        >
                          {s}
                        </StepCircle>
                      </StepRing>
                      {s < 4 && (
                        <VerticalDevider
                          className={step >= s && "bg-trip-a2"}
                        />
                      )}
                    </>
                  ))}
                </Flexrow>
              </Flexcol>

              {/**
               * ===========================
               * ANCHOR Dialog Box - section 2
               * ===========================
               */}

              <Flexrow>
                {/**
                 * ===========================
                 * ANCHOR Dialog Box - section 2
                 * NOTE - STEP 2 : select dates
                 * ===========================
                 */}
                {step === 2 && (
                  <>
                    <Flexcol className="text-14px gap-2.5">
                      <span className="px-1">Trip Begins</span>
                      <SelectDate valVar="startOn" setValue={setValue} />
                      {/**========= start date ERROR ========= */}
                      <ErrorFieldTrip error={errors.startOn} />

                      <span className="px-1">Trip Ends</span>
                      <SelectDate valVar="endsOn" setValue={setValue} />
                      {/**========= end date ERROR ========= */}
                      <ErrorFieldTrip error={errors.endsOn} />
                    </Flexcol>
                  </>
                )}

                {/**
                 * ===========================
                 * ANCHOR Dialog Box - section 2
                 * NOTE - STEP 3 : trip type - Domestic or International
                 * ===========================
                 */}
                {step === 3 && (
                  <>
                    <Flexcol className="text-14px gap-4">
                      {[0, 1].map((i) => (
                        <Flexrow className={"w-max items-center gap-2"}>
                          <Checkbox
                            className={
                              "data-[state=checked]:bg-trip-a3 data-[state=checked]:text-dark-a2 text-18px border-dark-a7 size-5 border hover:cursor-pointer"
                            }
                            checked={triptype === i}
                            onCheckedChange={() => handleTripType(i)}
                          />
                          <span>
                            {i == 0 && "Domestic"}
                            {i == 1 && "Abroad"}
                          </span>
                        </Flexrow>
                      ))}
                      {/**========= if trip is Abroad select country ========= */}
                      {triptype == 1 && (
                        <>
                          <SelectBar className={cn("bg-dark-a5 shadow-none")}>
                            <SelectCard
                              noIcon
                              isExpense
                              title={"Select Country"}
                            >
                              <SelectFilter
                                placeholder={"Select"}
                                onValueChange={handleSelectCountry}
                                list={getCountryNames()}
                              ></SelectFilter>
                            </SelectCard>
                          </SelectBar>
                          <ErrorFieldTrip error={errors.CCdata} />
                        </>
                      )}
                      {/**========= on selecting country current INR value appear ========= */}
                      {CCdata !== null && triptype == 1 && (
                        <>
                          <Flexrow className={"text-14px w-max items-center"}>
                            <span>{CCdata.country}</span>
                            <HorizontalDivider />
                            <span>
                              Exchange Rate of 1 {CCdata.currencyCode} in INR
                            </span>
                            <HorizontalDivider />
                            <span>
                              Rs. {numeral(CCdata.rate).format("0.000")}
                            </span>
                          </Flexrow>
                          {/**========= if country not selected ERROR ========= */}
                        </>
                      )}
                    </Flexcol>
                  </>
                )}

                {/**
                 * ===========================
                 * ANCHOR Dialog Box - section 2
                 * NOTE - STEP 4 : select solor or group type with members
                 * ===========================
                 */}
                {step >= 4 && (
                  <>
                    <Flexcol className="text-14px gap-2.5">
                      {[0, 1, 2, 3].map((i) => (
                        <Flexrow className={"w-max items-center gap-2"}>
                          <Checkbox
                            className={
                              "data-[state=checked]:bg-trip-a3 data-[state=checked]:text-dark-a2 text-18px border-dark-a7 size-5 border hover:cursor-pointer"
                            }
                            checked={grouptype === i}
                            onCheckedChange={() => handleGroupType(i)}
                          />
                          <span>
                            {i == 0 && "Solo Trip"}
                            {i == 1 && "Solo Family Trip"}
                            {i == 2 && "Group Trip"}
                            {i == 3 && "Group Family Trip"}
                          </span>
                        </Flexrow>
                      ))}
                      {/**========= if trip is in Group ask for No. of Members/Groups ? ========= */}
                      {grouptype >= 2 && (
                        <>
                          <Flexrow className={"items-baseline"}>
                            <span>How many Members/Families ?</span>
                            <input
                              className="inputType-number border-dark-a6 bg-dark-a6 hover:bg-dark-a2 hover:border-dark-a4 focus:bg-dark-a2 focus:border-dark-a4 hover:text-slate-a1 text-14px w-max rounded-sm border px-2.5 py-1 outline-none"
                              type="number"
                              onBlur={"This cannot be empty"}
                              {...register("ofGroup")}
                            />
                          </Flexrow>
                          {/**========= No. of Members/Groups not given ERROR ========= */}
                          <ErrorFieldTrip error={errors.ofGroup} />
                        </>
                      )}
                    </Flexcol>
                  </>
                )}
              </Flexrow>

              {/**
               * ===========================
               * ANCHOR Dialog Box - section 3
               * ===========================
               */}
              <Flexrow className={"text-14px"}>
                {/**========= back Button ========= */}
                <ExpButton
                  onClick={back}
                  custom_textbtn
                  className={"bg-trip-a2 text-dark-a2"}
                >
                  Back
                </ExpButton>
                {/**========= next & submit Button ========= */}
                <ExpButton
                  onClick={next}
                  custom_textbtn
                  className={"bg-trip-a2 text-dark-a2"}
                >
                  {step < 4 ? "Next" : "Submit"}
                </ExpButton>
              </Flexrow>
            </Flexcol>
          </Flexrow>
        </>
      )}
    </>
  );
};

export default CreateTripForm;

/**
 * ===========================
 * @function StepCircle
 * NOTE - circle to indicate dialog step
 * ===========================
 */

export const StepCircle = ({ children, className }) => {
  return (
    <Flexrow
      className={cn(
        "bg-br2 size-8 items-center justify-center rounded-full",
        className,
      )}
    >
      {children}
    </Flexrow>
  );
};

/**
 * ===========================
 * @function StepRing
 * NOTE - outer ring of circle to indicate dialog step
 * ===========================
 */
export const StepRing = ({ className, children }) => {
  return (
    <Flexrow
      className={cn(
        "border-dark-a6 size-10 items-center justify-center rounded-full border-2 bg-transparent",
        className,
      )}
    >
      {children}
    </Flexrow>
  );
};

/**
 * ===========================
 * @function ErrorFieldTrip
 * NOTE - displays the error element
 * ===========================
 */
export const ErrorFieldTrip = ({ error, className }) => {
  return (
    <>
      {error && (
        <p
          className={cn(
            "!text-12px text-error-a1 font-semibold italic",
            className,
          )}
        >
          {error}
        </p>
      )}
    </>
  );
};
