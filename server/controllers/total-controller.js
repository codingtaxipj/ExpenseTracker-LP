import { totalModal } from "../models/total-modal.js";
import moment from "moment";

const insertTotal = async (req, res, next) => {
  try {
    const {
      userID,
      isTypeExpense,
      ofAmount,
      onDate,
      primeCategory,
      subCategory,
    } = req.trnxData;

    const year = moment(onDate).year();
    const month = moment(onDate).month();

    let doc = await totalModal.findOne({
      userID,
      year,
      isTypeExpense,
    });
    if (!doc) {
      await totalModal.create({
        userID,
        year,
        isTypeExpense,
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
      next();
      return;
    }
    await totalModal.updateOne(
      { userID, year, isTypeExpense },
      {
        $inc: {
          total: ofAmount,
        },
      }
    );

    // Fetch the updated document to ensure latest data
    doc = await totalModal.findOne({
      userID,
      year,
      isTypeExpense,
    });

    const monthExists = doc?.monthList?.some(m => m.month === month);
    const primeExists = doc?.primeList?.some(p => p.name === primeCategory);
    const subExists = doc?.subList?.some(s => s.subName === subCategory);
    const subEntry = doc?.subList?.find(
      s => s.primeName === primeCategory && s.subName === subCategory
    );
    const subMonthExist = subEntry?.monthList?.some(sm => sm.month === month);

    if (monthExists) {
      await totalModal.updateOne(
        { userID, year, isTypeExpense },
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
        { userID, year, isTypeExpense },
        {
          $push: {
            monthList: { month, total: ofAmount },
          },
        }
      );
    }

    if (primeExists) {
      await totalModal.updateOne(
        { userID, year, isTypeExpense },
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
        { userID, year, isTypeExpense },
        {
          $push: {
            primeList: { name: primeCategory, total: ofAmount },
          },
        }
      );
    }

    if (subExists) {
      await totalModal.updateOne(
        { userID, year, isTypeExpense },
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
        { userID, year, isTypeExpense },
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
        { userID, year, isTypeExpense },
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
        { userID, year, isTypeExpense },
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

    req.minmaxData = { year, userID, isTypeExpense };
    next();
    return;
  } catch (error) {
    console.error(error);
    console.log("error Occured !! inserting total");
    return;
  }
};

/* NOTE - fetchTotal
 ** it will fetch the budget data of given user
 ** if no data is found then return null
 */
const fetchTotal = async (req, res) => {
  try {
    const { userID } = req.params;
    console.log("ID", userID);
    const data = await totalModal.find({ userID });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Total" });
  }
};

export { insertTotal, fetchTotal };
