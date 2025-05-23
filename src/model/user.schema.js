const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema=new Schema({
    email:{type :String,unique:true,required:true,index:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    role:{type:String,default:"user",enum:["user","guest"]},
    purchases:[{type:Schema.Types.ObjectId,ref:"purchase"}]
    
},{timestamps:true})


const userModel = mongoose.model("user", userSchema);

module.exports={
    userModel,
  }