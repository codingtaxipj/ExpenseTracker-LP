import { totalModal } from "../models/total-modal.js";
import moment from "moment";

const insertTotal = async (req, res) => {
  try {
    const { userID, ofAmount, onDate, primeCategory, subCategory } =
      req.trnxData;

    const year = moment(onDate).year();
    const month = moment(onDate).month();

    let doc = await totalModal.findOne({ userID, year });
    if (!doc) {
      await totalModal.create({
        userID,
        year,
        total: ofAmount,
        monthList: [{ month, total: ofAmount }],
        primeList: [{ name: primeCategory, total: ofAmount }],
        subList: [
          {
            primeName: primeCategory,
            subName: subCategory,
            total: ofAmount,
            monthList: [{ month, total: ofAmount }],
          },
        ],
      });
      console.log("Created new yearly total");
      return;
    }
    await totalModal.updateOne(
      { userID, year },
      {
        $inc: {
          total: ofAmount,
        },
      }
    );

    // Fetch the updated document to ensure latest data
    doc = await totalModal.findOne({ userID, year });

    const monthExists = doc?.monthList?.some(m => m.month === month);
    const primeExists = doc?.primeList?.some(p => p.name === primeCategory);
    const subExists = doc?.subList?.some(s => s.subName === subCategory);
    const subEntry = doc?.subList?.find(
      s => s.primeName === primeCategory && s.subName === subCategory
    );
    const subMonthExist = subEntry?.monthList?.some(sm => sm.month === month);

    if (monthExists) {
      await totalModal.updateOne(
        { userID, year },
        {
          $inc: {
            "monthList.$[m].total": ofAmount,
          },
        },
        {
          arrayFilters: [{ "m.month": month }],
        }
      );
    } else {
      await totalModal.updateOne(
        { userID, year },
        {
          $push: {
            monthList: { month, total: ofAmount },
          },
        }
      );
    }

    if (primeExists) {
      await totalModal.updateOne(
        { userID, year },
        {
          $inc: {
            "primeList.$[p].total": ofAmount,
          },
        },
        {
          arrayFilters: [{ "p.name": primeCategory }],
        }
      );
    } else {
      await totalModal.updateOne(
        { userID, year },
        {
          $push: {
            primeList: { name: primeCategory, total: ofAmount },
          },
        }
      );
    }

    if (subExists) {
      await totalModal.updateOne(
        { userID, year },
        {
          $inc: {
            "subList.$[s].total": ofAmount,
          },
        },
        {
          arrayFilters: [
            { "s.primeName": primeCategory, "s.subName": subCategory },
          ],
        }
      );
    } else {
      await totalModal.updateOne(
        { userID, year },
        {
          $push: {
            subList: {
              primeName: primeCategory,
              subName: subCategory,
              total: ofAmount,
            },
          },
        }
      );
    }

    if (subMonthExist) {
      await totalModal.updateOne(
        { userID, year },
        {
          $inc: {
            "subList.$[sub].monthList.$[sm].total": ofAmount,
          },
        },
        {
          arrayFilters: [
            { "sub.primeName": primeCategory, "sub.subName": subCategory },
            { "sm.month": month },
          ],
        }
      );
    } else {
      await totalModal.updateOne(
        { userID, year },
        {
          $push: {
            "subList.$[sub].monthList": { month: month, total: ofAmount },
          },
        },
        {
          arrayFilters: [
            { "sub.primeName": primeCategory, "sub.subName": subCategory },
          ],
        }
      );
    }

    console.log("Transaction added to total breakdown");
    return;
  } catch (error) {
    console.error(error);
    console.log("error Occured !! inserting total");
    return;
  }
};

export { insertTotal };
