const mongoose = require("mongoose");

 async function connectDb() {
  try {
    if (mongoose.connection.readyState===1){
      console.log("Already connected to MongoDb")
    return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to db");
  } catch (error) {
    console.log("failed to connect to MONGO-DB" , error.message)
    process.exit(1);
  }
}

module.exports={
    connectDb
}