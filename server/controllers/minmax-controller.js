import moment from "moment";
import { minmaxModal } from "../models/minmax-modal.js";
import { totalModal } from "../models/total-modal.js";
import isEqual from "lodash.isequal";

const insertMinMax = async (req, res) => {
  try {
    const { userID, onDate } = req.minmaxData;
    const year = moment(onDate).year();

    const totalDB = await totalModal.findOne({ userID, year });
    if (!totalDB) return console.log("no Total DB found");
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
      minMonth,
      maxMonth,
      minPrime,
      maxPrime,
      minSub,
      maxSub,
    };

    const existingDoc = await minmaxModal.findOne({ userID, year });
    const isDifferent =
      !existingDoc ||
      !isEqual(
        {
          userID: existingDoc.userID,
          year: existingDoc.year,
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
        { userID, year },
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

export { insertMinMax };

const getMinMax = (list, key = "total") => {
  if (!list || !list.length) return { min: null, max: null };
  if (list.length === 1) return { min: list[0], max: list[0] };
  const sorted = [...list].sort((a, b) => a[key] - b[key]);
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
  };
};
