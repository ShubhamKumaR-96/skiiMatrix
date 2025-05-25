const { Router } = require("express");
const { adminSchema, courseSchema, validate } = require("../utils/validator");
const { signup, signin, createCourse, updateCourse, getCourse } = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/authenticate");

const adminRouter = Router();

adminRouter.post('/signup',validate(adminSchema),signup)
adminRouter.post('/signin',validate(adminSchema),signin)
adminRouter.post('/course',authenticateToken ,validate(courseSchema),createCourse)
adminRouter.put('/course/:courseId',authenticateToken,updateCourse)
adminRouter.get('/course/buld',authenticateToken,getCourse)

module.exports = {
  adminRouter: adminRouter,
};
