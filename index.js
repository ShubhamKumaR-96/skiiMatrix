
require('dotenv').config();
const express = require("express");
const { userRouter } = require("./src/routes/userRoutes");
const { adminRouter } = require("./src/routes/adminRoutes");
const { courseRouter } = require("./src/routes/courseRoutes");
const { connectDb } = require("./src/config/dbConfig");

const app = express();
app.use(express.json())

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

connectDb();

app.listen(3001, () => {
  console.log(`server running at http://localhost:3001`);
});
