const mongoose = require("mongoose");

 async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/course-selling-app");
    console.log("connected to db");
  } catch (error) {
    console.log("failed to connect")
    throw error
  }
}

module.exports={
    connectDb
}