const { Router } = require("express");

const adminRouter = Router();

adminRouter.post("/signin", (req, res) => {
  res.json({
    msg: "admin signed",
  });
});
adminRouter.post("/signup", (req, res) => {
  res.json({
    user: "admin sign up",
  });
});
adminRouter.get("/", (req, res) => {
  res.json({
    user: "courses endpoints",
  });
});
adminRouter.get("/bulk", (req, res) => {
  res.json({
    user: "bulk endpoints",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
