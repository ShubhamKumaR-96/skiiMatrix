const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../model/user.schema");
const JWT_ADMIN_SCERET = "JWT_ADMIN_SCERET";

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    // hashed password

    const adminhashedPassword = await bcrypt.hash(password, 5);

    await adminModel.create({
      email: email,
      password: adminhashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    return res.status(201).json({
      msg: "admin successfullly sign up",
    });
  } catch (error) {
    console.log("error while doing admin sign up", error.message);
    return res.status(500).json({
      error: "failed to sign up",
    });
  }
});
adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "email and password is required" });
    }
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ error: "admin not found" });
    }

    const adminPassIsMatched = await bcrypt.compare(password, admin.password);
    if (!adminPassIsMatched) {
      return res.status(400).json({
        error: "invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_SCERET
    );

    return res.status(201).json({
      msg: "admin signin successfully",
      token,
      admin: {
        email: admin.email,
      },
    });
  } catch (error) {
    console.log("error while signing ", error.message);
    return res.status(500).json({
      error: "failed to sign in",
    });
  }
});
adminRouter.post("/course", (req, res) => {
  res.json({
    user: "courses endpoints",
  });
});
adminRouter.put("/course", (req, res) => {
  res.json({
    user: "courses endpoints",
  });
});
adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    user: "bulk endpoints",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
