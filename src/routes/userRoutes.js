const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signin", (req, res) => {
  res.json({
    user: "user signed",
  });
});
userRouter.post("/signup", (req, res) => {
  res.json({
    user: "user signup",
  });
});
userRouter.get("/course", (req, res) => {
  res.json({
    user: "user signed",
  });
});
userRouter.get("/preview", (req, res) => {
  res.json({
    user: "user signed",
  });
});

module.exports = {
  userRouter: userRouter,
};
