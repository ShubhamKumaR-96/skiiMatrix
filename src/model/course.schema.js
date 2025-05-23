const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {type:Number,required:true,min:0},
  imageUrl: {type:String},
  creatorId: {type:Schema.Types.ObjectId,ref:"admin",required:true},
  isPublished:{type:Boolean,default:false},
  category:{
    type:String,
    enum:["development","desgin","business","others"],
  },
},{timestamps:true});

const courseModel = mongoose.model("course", courseSchema);

module.exports = {
  courseModel: courseModel,
};
