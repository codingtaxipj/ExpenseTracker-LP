import mongoose from "mongoose";

// --- Shared Connection Options ---
// Define your timeout logic and other options in one place.
const connectionOptions = {
  connectTimeoutMS: 5000, // 5 seconds to initially connect
  socketTimeoutMS: 10000, // 10 seconds for queries to respond
};

// --- Primary Database Connection ---
const primaryUri = process.env.PRIMARY_DB_URI;
export const primaryConnection = mongoose.createConnection(
  primaryUri,
  connectionOptions
);

primaryConnection.on("connected", () => {
  console.log(`✅ Primary DB Connected: ${primaryConnection.name}`);
});

primaryConnection.on("error", err => {
  console.error(
    `❌ Primary DB Connection Error for ${primaryConnection.name}:`,
    err
  );
});

primaryConnection.on("disconnected", () => {
  console.log(`🔌 Primary DB Disconnected: ${primaryConnection.name}`);
});

/**
 ** just in case i want more thann one host and DB to connect to

const secondaryUri = process.env.SECONDARY_DB_URI;
export const secondaryConnection = mongoose.createConnection(secondaryUri, connectionOptions);

secondaryConnection.on('connected', () => {
  console.log(`✅ Secondary DB Connected: ${secondaryConnection.name}`);
});

secondaryConnection.on('error', (err) => {
  console.error(`❌ Secondary DB Connection Error for ${secondaryConnection.name}:`, err);
});

secondaryConnection.on('disconnected', () => {
  console.log(`🔌 Secondary DB Disconnected: ${secondaryConnection.name}`);
});


*/
