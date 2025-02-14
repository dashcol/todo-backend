import mongoose from "mongoose";

 const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to DB");
  } catch (error) {
    console.error("DATABASE CONNECTION ERROR:", error);
    process.exit(1);
  }
};

export default connectToDB