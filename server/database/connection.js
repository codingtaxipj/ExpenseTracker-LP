import mongoose from "mongoose";
// NOTE connection to mongoDB host
const toHost = async host =>
  await mongoose
    .connect(host)
    .catch(err => console.log("Error : " + err));
export { toHost as mongoConnectHost };

const toDB = async database => {
  try {
    const db = mongoose.connection.useDb(database); // Switch database
    return db; // Return the database connection
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};
export { toDB as mongoConnectDB };
