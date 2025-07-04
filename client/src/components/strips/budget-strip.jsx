import { useForm } from "react-hook-form";
import ExpButton from "../custom-ui/expButton";
import { FieldLabel, FormField } from "../Forms/Form";
import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import { Button } from "../ui/button";
import { amountInteger } from "../utilityFilter";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const BudgetStrip = ({ className = "" }) => {
  const userID = 12345;
  const [userBudget, setUserBudget] = useState(null);
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/budget/get-data/${userID}`,
        );
        setUserBudget(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Validation Error:", error.response.data.errors);
          alert(
            error.response.data?.errors?.[0]?.msg ||
              error.response.data?.message ||
              "Fetching Budget failed.",
          );
        } else {
          console.error("Unknown Axios Error:", error.message);
          alert("Network or unknown error.");
        }
      }
    };
    if (userID) fetchBudget();
  }, [userID]);

  const activeDate = moment().toISOString();
  const nextMonthDate = moment().add(1, "month").startOf("month").format();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userID: 123456,
      activeFrom: activeDate,
    },
  });
  const onSubmit = async (data) => {
    if (userBudget !== null) {
      data.activeFrom = moment(nextMonthDate).toDate();
    }
    console.log("date is :: ", moment(nextMonthDate).toDate());

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/budget/add-data",
        data,
      );

      toast.success("Success", {
        description: response.data.message,
        action: {
          label: "Ok!",
          onClick: () => reset(),
        },
      });
    } catch (error) {
      if (error.response) {
        console.error("Validation Error:", error.response.data.errors);
        alert(
          error.response.data?.errors?.[0]?.msg ||
            error.response.data?.message ||
            "Budget Submission failed.",
        );
      } else {
        console.error("Unknown Axios Error:", error.message);
        alert("Network or unknown error.");
      }
    }
  };
  return (
    <>
      <div
        className={`text-16 flex h-7 flex-row items-center gap-1 rounded-md font-medium ${className}`}
      >
        <span className="mr-1.5">
          <Icons.calc className={`text-budget`} />
        </span>

        {userBudget !== null && (
          <>
            <h4>Monthly Budget To Spend</h4>
            <span className="bg-91 mx-2 h-full w-[0.5px]"></span>
            <span className="italic">INR</span>
            <h4>{amountInteger(userBudget.budgetAmount)}</h4>
          </>
        )}

        {userBudget !== null && (
          <>
            <h4>No Monthly Budget is Set</h4>
            <span className="bg-91 mx-2 h-full w-[0.5px]"></span>

            <Drawer>
              <DrawerTrigger>
                {" "}
                <ExpButton
                  btnfor="budget"
                  className="font-normal"
                  label="Set Budget"
                />
              </DrawerTrigger>
              <DrawerContent
                className={`from-gradBot to-gradTop bg-gradient-to-t`}
              >
                <DrawerHeader>
                  <Flexrow className="justify-center text-white">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="w-160 min-w-100"
                    >
                      <FormField>
                        <FieldLabel
                          iconColor={"text-white"}
                          htmlFor="Budget Amount"
                          label="Budget Amount"
                        />
                        <div className="inline-flex w-full items-center border-b-1 border-white font-bold">
                          <Icons.rupee className="text-[18px]" />
                          <input
                            className="inputType-number text-24 w-full rounded-md border-none px-3 py-1 outline-none"
                            type="number"
                            {...register("budgetAmount", {
                              required: "* Please provide a Budget Amount",
                              valueAsNumber: true,
                            })}
                          />
                          <span className="text-[18px]">INR</span>
                        </div>
                      </FormField>
                      <FormField className="items-end">
                        <div className="flex gap-2">
                          <ExpButton
                            type="submit"
                            btnfor="budget"
                            label={"Set Budget"}
                          />
                          <DrawerClose>
                            <ExpButton
                              type="button"
                              btnfor="cancel"
                              label={"Cancel"}
                            />
                          </DrawerClose>
                        </div>
                      </FormField>
                    </form>
                  </Flexrow>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </div>
    </>
  );
};

export default BudgetStrip;
