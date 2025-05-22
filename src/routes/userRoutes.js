const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.schema");
const JWT_SCRERT = "JWT_SCERET";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields required" });
    }
    // hash passwod
    const hashedPassword = await bcrypt.hash(password, 5);

    await userModel.create({
      email: email,
      password: hashedPassword, // hashed password
      firstName: firstName,
      lastName: lastName,
    });

    return res.status(201).json({
      msg: "user successfully signup",
    });
  } catch (error) {
    console.error("Error while doing signup:", error.message);
    return res.status(500).json({ error: "Failed to sign up user" });
  }
});
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // validate input
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }
    // find user by email
    const user = await userModel.findOne({ email });
    console.log("user: ", user);
    if (!user) {
      return res.json({ error: "user not found" });
    }
    // compare the provided password and stored password
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ error: "invalid password" });
    }
    // generate jwt token

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SCRERT
    );
    return res.status(200).json({
      msg: "user successfully sign in ",
      token,
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error while signing in:", error.message);
    return res.status(500).json({ error: "Failed to sign in" });
  }
});
userRouter.get("/purchase", (req, res) => {
  res.json({
    user: "user purchased",
  });
});

module.exports = {
  userRouter: userRouter,
};
