const { adminModel } = require("../model/admin.schema");
const { courseModel } = require("../model/course.schema");
const { hashedPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const hashPassword = await hashedPassword(password);

  const admin = await adminModel.create({
    email,
    password: hashPassword,
    firstName,
    lastName,
  });

  res.status(201).json({
    msg: "User signed up successfully",
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email });

  if (!admin) return res.status(404).json({ error: "admin not found" });

  const isMatched = await comparePassword(password, admin.password);

  if (!isMatched) return res.status(401).json({ error: "invalid password" });

  const token = generateToken({ adminId: admin._id, email: admin.email });

  res.status(200).json({
    msg: "admin successfullu signed in",
    token,
    admin: {
      email: admin.email,
    },
  });
};

const createCourse = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  const adminId = req.user.adminId;

  const course = await courseModel.create({
    title,
    description,
    price,
    imageUrl,
    creatorId: adminId,
    isPublished: false,
  });
  await adminModel.findByIdAndUpdate(adminId, {
    $push: { createdCourses: course._id },
  });
  res.status(201).json({
    msg: "Course created successfully",
    course,
  });
};

const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const adminId = req.user.adminId;

  const course = await courseModel.findByIdAndUpdate(
    { _id: courseId, creatorId: adminId },
    req.body,
    { new: true }
  );

  if (!course) return res.status(404).json({ error: "course not found" });

  res.status(200).json({
    msg: "course updated successfully",
  });
};

const getCourse=async(req , res)=>{
    const adminId=req.user.adminId;
    const course=await courseModel.find({creatorId:adminId})
    res.status(200).json({course:course})
}

module.exports={
    signup,signin,createCourse,getCourse,updateCourse
}

