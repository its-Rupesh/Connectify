import mongoose from "mongoose";

// MongoDB Connection
const connectDB = (url) => {
  mongoose
    .connect(url, { dbName: "Connectify" })
    .then((data) => console.log(`MongoDb Connected to ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};

export { connectDB };
