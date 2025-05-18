const { Router } = require("express");

const courseRouter = Router();

courseRouter.get("/preview", (req, res) => {
  res.json({
    msg: "Preview endpoint",
  });
});

courseRouter.get("/courses", (req, res) => {
  res.json({
    msg: "courses endpoint",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
