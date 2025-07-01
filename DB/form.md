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

/////////////////////////////////////////////////////////////////////////

{/**ANCHOR TRIP or Repeating Payment Select Field \*/}
<FormField>
<div className="flex gap-5">
<FieldLabel htmlFor="subCategory" label=" Mark Expense as" />
<div className="flex items-center gap-2">
<Checkbox
className={
"data-[state=checked]:bg-pupl border-dimText hover:cursor-pointer"
}
checked={selectedFormFor === "trip"}
onCheckedChange={() => handleCheckedFormFor("trip")} ></Checkbox>
<span>Trip Expense</span>
</div>
<div className="flex items-center gap-2">
<Checkbox
className={
"data-[state=checked]:bg-pupl border-dimText hover:cursor-pointer"
}
checked={selectedFormFor === "repeat"}
onCheckedChange={() => handleCheckedFormFor("repeat")} ></Checkbox>
<span>Repeating Expense</span>
</div>
<div className="flex items-center gap-2">
<Checkbox
className={
"data-[state=checked]:bg-pupl border-dimText hover:cursor-pointer"
}
checked={selectedFormFor === null}
onCheckedChange={() => handleCheckedFormFor(null)} ></Checkbox>
<span>None</span>
</div>
</div>
</FormField>
{/**ANCHOR ##END: TRIP or Repeating Payment Select Field \*/}

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
