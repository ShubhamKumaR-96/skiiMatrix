const { Router } = require("express");
const { userSchema, validate } = require("../utils/validator");
const { signup, signin, purchaseCourse, getPurchases } = require("../controllers/userController");

const userRouter = Router();

userRouter.post('/signup',validate(userSchema),signup)
userRouter.post('/signin',validate(userSchema),signin)
userRouter.post('/purchase',validate(userSchema),purchaseCourse)
userRouter.get('/purchases',validate(userSchema),getPurchases)

module.exports = {
  userRouter: userRouter,
};
