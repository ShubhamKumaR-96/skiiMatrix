const { courseModel } = require("../model/course.schema");
const { purchaseModel } = require("../model/purchase.Schema");
const { userModel } = require("../model/user.schema");
const { hashedPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");


const signup=async(req , res)=>{
    const {email,password,firstName,lastName}=req.body;
    const hashPassword=await hashedPassword(password)

    const user=await userModel.create({
        email,password:hashPassword,firstName,lastName
    })

    res.status(201).json({
        msg:"user signed up successfully"
    })
}

const signin=async(req ,res)=>{
    const {email,password}=req.body
    
    const user=await userModel.findOne({email})

    if(!user) return res.status(404).json({error:"user not found"})

    const isMatched=await comparePassword(password,user.password)
    
    if (!isMatched) return res.status(401).json({error:"Invalid password"})

    const token=generateToken({userId:user._id,email:user.email})
    
    res.status(200).json({
        msg:"user signed in successfully",
        token,
        user:{email:user.email,firstName:user.firstName,lastName:user.lastName}
    })
}

const purchaseCourse=async(req,res)=>{
    const {courseId}=req.body
    const userId=req.user.userId
    const course=await courseModel.findById(courseId)

    if(!course || !course.isPublished){
        return res.status(404).json({error:"Course not found or not published"})
    }

    const purchase=await purchaseModel.create({
        userId,
        courseId,
        amount:course.price,
        status:"completed"

    })

    await userModel.findByIdAndUpdate(userId,{$push:{purchases:purchase._id}})
    res.status(201).json({msg:"course purchase successfully"})
}

const getPurchases=async(req,res)=>{
    const purchases=await purchaseModel.find({userId:req.user.userId}).populate("courseId")
    res.status(200).json({purchases})
}

module.exports={
    signin,signup,purchaseCourse,getPurchases
}