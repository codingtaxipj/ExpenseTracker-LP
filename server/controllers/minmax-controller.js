import { minmaxModal } from "../models/minmax-modal.js";
import isEqual from "lodash.isequal";
import { totalModal } from "../models/total-modal.js";

const insertMinMax = async (req, res) => {
  try {
    const { userID, year, isTypeExpense } = req.minmaxData;
    const totalDB = await totalModal.findOne({
      userID,
      year,
      isTypeExpense,
    });

    const { monthList, primeList, subList } = totalDB;
    const { min: minMonth, max: maxMonth } = getMinMax(monthList);

    const { min: minPrime, max: maxPrime } = getMinMax(primeList);
    const primeCats = [...new Set(subList.map(sub => sub.primeName))];
    const minSub = [];
    const maxSub = [];
    for (let prime of primeCats) {
      const subsForPrime = subList.filter(sub => sub.primeName === prime);
      const { min, max } = getMinMax(subsForPrime);
      if (min) minSub.push(min);
      if (max) maxSub.push(max);
    }

    const newMinMaxDoc = {
      userID,
      year,
      isTypeExpense,
      minMonth,
      maxMonth,
      minPrime,
      maxPrime,
      minSub,
      maxSub,
    };

    const existingDoc = await minmaxModal.findOne({
      userID,
      year,
      isTypeExpense,
    });
    const isDifferent =
      !existingDoc ||
      !isEqual(
        {
          userID: existingDoc.userID,
          year: existingDoc.year,
          isTypeExpense: existingDoc.isTypeExpense,
          minMonth: existingDoc.minMonth,
          maxMonth: existingDoc.maxMonth,
          minPrime: existingDoc.minPrime,
          maxPrime: existingDoc.maxPrime,
          minSub: existingDoc.minSub,
          maxSub: existingDoc.maxSub,
        },
        newMinMaxDoc
      );

    if (isDifferent) {
      await minmaxModal.findOneAndUpdate(
        { userID, year, isTypeExpense },
        { $set: newMinMaxDoc },
        { upsert: true, new: true }
      );
      console.log("MinMax saved/updated.");
    } else {
      console.log("No change. Skipped saving.");
    }
  } catch (err) {
    console.error(err);
  }
};

const fetchMM = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await minmaxModal.find({ userID });
    if (!data || data.length === 0) return res.status(404).json(null);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch MInMAx" });
  }
};

export { insertMinMax, fetchMM };

const getMinMax = (list, key = "total") => {
  if (!list || !list.length) return { min: null, max: null };
  if (list.length === 1) return { min: list[0], max: list[0] };
  const sorted = [...list].sort((a, b) => a[key] - b[key]);
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
  };
};
