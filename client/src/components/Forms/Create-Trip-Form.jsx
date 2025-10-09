import { useForm } from "react-hook-form";
import { Icons } from "../icons";
import Flexcol from "../section/flexcol";
import Flexrow from "../section/flexrow";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getCodeOf, getCountryNames } from "@/global/countries";
import { useDispatch } from "react-redux";
import numeral from "numeral";

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
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  /**
   * =============================================================
   * * ANCHOR react-hook-form Setup
   * All form state and validation is now managed here.
   * ==============================================================
   */
  const {
    register,
    handleSubmit,
    reset,
    control, // For controlled components like SelectDate
    watch, // To watch for changes in form values
    trigger, // To validate specific steps
    setValue, // To set form values programmatically
    formState: { errors },
  } = useForm({
    defaultValues: {
      userID: 123456,
      tripType: 0,
      travelType: 0,
      abroadInfo: null,
      ofGroup: 1,
      tripTotal: 0,
      tripTitle: "",
      startOn: null,
      endsOn: null,
    },
  });

  // Watch for changes in these form fields to reactively update the UI.
  const tripType = watch("tripType");
  const travelType = watch("travelType");
  const abroadInfo = watch("abroadInfo");

  /**
   * =============================================================
   * * ANCHOR Form Submission
   * Handles the final submission with a robust try/catch block.
   * ==============================================================
   */
  const onSubmit = async (data) => {
    try {
      await dispatch(insertTrip({ data })).unwrap();
      toast.success("Success!", {
        description: "Your new trip has been created.",
        action: { label: "Ok!", onClick: () => resetForm() },
      });
      setOpen(false);
    } catch (errMessage) {
      toast.error("Creation Failed", {
        description: errMessage,
        action: { label: "Try Again", onClick: () => {} },
      });
    }
  };

  /**
   * =============================================================
   * * ANCHOR Multi-Step Logic
   * Uses react-hook-form's `trigger` to validate each step.
   * ==============================================================
   */
  const nextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ["tripTitle"];
    if (step === 2) fieldsToValidate = ["startOn", "endsOn"];
    if (step === 3) fieldsToValidate = ["abroadInfo"];
    if (step === 4) fieldsToValidate = ["ofGroup"];

    const isValid = await trigger(fieldsToValidate);

    if (isValid && step < 4) {
      setStep((s) => s + 1);
    } else if (isValid && step === 4) {
      // If the last step is valid, call the main submit handler
      handleSubmit(onSubmit)();
    }
  };

  const prevStep = () => setStep((s) => (s > 1 ? s - 1 : 1));

  const resetForm = () => {
    reset();
    setStep(1);
    setOpen(false);
  };

  const handleSelectCountry = async (countryName) => {
    const countryDetails = getCodeOf(countryName);
    const currencyCode = countryDetails.currencyCode.toLowerCase();
    try {
      const res = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.json`,
      );
      const data = await res.json();
      const result = {
        country: countryDetails.name,
        currency: countryDetails.currency,
        currencyCode: countryDetails.currencyCode,
        rate: data[currencyCode]["inr"] ?? null,
      };
      setValue("abroadInfo", result, { shouldValidate: true });
    } catch (error) {
      console.error("Failed to fetch currency data", error);
      setValue("abroadInfo", null);
    }
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
          <input
            className="text-24px placeholder:text-slate-a1/70 w-full rounded-md border-none px-1 py-1 font-bold outline-none"
            type="text"
            placeholder="Himalayan Adventure ..."
            {...register("tripTitle", { required: "* Trip title is required" })}
          />
        </Flexrow>
        <ErrorFieldTrip
          className={"text-dark-a2"}
          error={errors.tripTitle?.message}
        />
        <Flexrow className="justify-end">
          <ExpButton
            onClick={async () => {
              const isValid = await trigger("tripTitle");
              if (isValid) {
                setOpen(true);
                setStep(2); // Start at step 2 since title is already entered
              }
            }}
            custom_textbtn
            className={"text-trip-a4 bg-dark-a2"}
          >
            <Icons.add_plus className="text-18px" />
            <span className="text-14px">Create Trip</span>
          </ExpButton>
        </Flexrow>
      </Flexcol>

      {open && (
        <Flexrow className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flexcol
              className={cn(
                "relative h-[450px] w-[700px] justify-between gap-2.5 p-10",
                cardBgv2,
              )}
            >
              {/* --- Header and Step Indicator --- */}
              <Flexcol>
                <Flexrow className={"items-center justify-between"}>
                  <span className="text-14px">
                    {step === 2 && "Select Dates"}
                    {step === 3 && "Select Destination"}
                    {step === 4 && "How are you Traveling?"}
                  </span>
                  <ExpButton
                    onClick={resetForm}
                    custom_iconbtn
                    className={"p-2.5"}
                  >
                    <Icons.cross className="text-18px hover:text-trip-a4" />
                  </ExpButton>
                </Flexrow>
                <Flexrow className={"items-center gap-1"}>
                  {[1, 2, 3, 4].map((s) => (
                    <Flexrow key={s} className="items-center">
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
                    </Flexrow>
                  ))}
                </Flexrow>
              </Flexcol>

              {/* --- Form Content by Step --- */}
              <Flexrow>
                {step === 2 && (
                  <Flexcol className="text-14px gap-2.5">
                    <span className="px-1">Trip Begins</span>
                    <Controller
                      name="startOn"
                      control={control}
                      rules={{ required: "Start date is required" }}
                      render={({ field }) => (
                        <SelectDate
                          onSelect={field.onChange}
                          selected={field.value}
                        />
                      )}
                    />
                    <ErrorFieldTrip error={errors.startOn?.message} />

                    <span className="px-1">Trip Ends</span>
                    <Controller
                      name="endsOn"
                      control={control}
                      rules={{
                        required: "End date is required",
                        validate: (value, formValues) =>
                          new Date(value) >= new Date(formValues.startOn) ||
                          "End date cannot be before start date",
                      }}
                      render={({ field }) => (
                        <SelectDate
                          onSelect={field.onChange}
                          selected={field.value}
                        />
                      )}
                    />
                    <ErrorFieldTrip error={errors.endsOn?.message} />
                  </Flexcol>
                )}
                {step === 3 && (
                  <Flexcol className="text-14px gap-4">
                    {[0, 1].map((i) => (
                      <Flexrow key={i} className={"w-max items-center gap-2"}>
                        <Checkbox
                          className="data-[state=checked]:bg-trip-a3 data-[state=checked]:text-dark-a2 text-18px border-dark-a7 size-5 border hover:cursor-pointer"
                          checked={tripType === i}
                          onCheckedChange={() =>
                            setValue("tripType", tripType === i ? 0 : i)
                          }
                        />
                        <span>{i === 0 ? "Domestic" : "Abroad"}</span>
                      </Flexrow>
                    ))}
                    {tripType === 1 && (
                      <>
                        <Controller
                          name="abroadInfo"
                          control={control}
                          rules={{
                            validate: (value) =>
                              tripType !== 1 ||
                              (value && value.country) ||
                              "Country details are required for international trips",
                          }}
                          render={() => (
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
                                />
                              </SelectCard>
                            </SelectBar>
                          )}
                        />
                        <ErrorFieldTrip error={errors.abroadInfo?.message} />
                        {abroadInfo && (
                          <Flexrow className={"text-14px w-max items-center"}>
                            <span>{abroadInfo.country}</span>
                            <HorizontalDivider />
                            <span>1 {abroadInfo.currencyCode} =</span>
                            <span>
                              Rs. {numeral(abroadInfo.rate).format("0.000")}
                            </span>
                          </Flexrow>
                        )}
                      </>
                    )}
                  </Flexcol>
                )}
                {step === 4 && (
                  <Flexcol className="text-14px gap-2.5">
                    {[0, 1, 2, 3].map((i) => (
                      <Flexrow key={i} className={"w-max items-center gap-2"}>
                        <Checkbox
                          className="data-[state=checked]:bg-trip-a3 data-[state=checked]:text-dark-a2 text-18px border-dark-a7 size-5 border hover:cursor-pointer"
                          checked={travelType === i}
                          onCheckedChange={() =>
                            setValue("travelType", travelType === i ? 0 : i)
                          }
                        />
                        <span>
                          {i === 0 && "Solo Trip"}
                          {i === 1 && "Solo Family Trip"}
                          {i === 2 && "Group Trip"}
                          {i === 3 && "Group Family Trip"}
                        </span>
                      </Flexrow>
                    ))}
                    {travelType >= 2 && (
                      <>
                        <Flexrow className={"items-baseline"}>
                          <span>How many Members/Families?</span>
                          <input
                            className="inputType-number border-dark-a6 bg-dark-a6 hover:bg-dark-a2 hover:border-dark-a4 focus:bg-dark-a2 focus:border-dark-a4 hover:text-slate-a1 text-14px w-max rounded-sm border px-2.5 py-1 outline-none"
                            type="number"
                            {...register("ofGroup", {
                              valueAsNumber: true,
                              validate: (value) =>
                                travelType < 2 ||
                                value >= 1 ||
                                "Group size must be at least 1",
                            })}
                          />
                        </Flexrow>
                        <ErrorFieldTrip error={errors.ofGroup?.message} />
                      </>
                    )}
                  </Flexcol>
                )}
              </Flexrow>

              {/* --- Footer Buttons --- */}
              <Flexrow className={"text-14px"}>
                <ExpButton
                  onClick={prevStep}
                  custom_textbtn
                  className={"bg-trip-a2 text-dark-a2"}
                >
                  Back
                </ExpButton>
                <ExpButton
                  onClick={nextStep}
                  custom_textbtn
                  className={"bg-trip-a2 text-dark-a2"}
                >
                  {step < 4 ? "Next" : "Submit"}
                </ExpButton>
              </Flexrow>
            </Flexcol>
          </form>
        </Flexrow>
      )}
    </>
  );
};

export default CreateTripForm;
/**
 * ===========================
 * Helper Components
 * ===========================
 */

export const StepCircle = ({ children, className }) => (
  <Flexrow
    className={cn(
      "bg-br2 size-8 items-center justify-center rounded-full",
      className,
    )}
  >
    {children}
  </Flexrow>
);

export const StepRing = ({ className, children }) => (
  <Flexrow
    className={cn(
      "border-dark-a6 size-10 items-center justify-center rounded-full border-2 bg-transparent",
      className,
    )}
  >
    {children}
  </Flexrow>
);

export const ErrorFieldTrip = ({ error, className }) => (
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
