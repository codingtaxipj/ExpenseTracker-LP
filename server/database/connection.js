import mongoose from 'mongoose';

/**
 * Establishes the default connection to the MongoDB database.
 */
export const connectToDatabase = () => {
  console.log("Attempting to connect to the database...");
  const options = {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  };
  // This returns the promise from mongoose.connect
  return mongoose.connect(process.env.MONGO_URI, options);
};