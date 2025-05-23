const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: "admin", enum: ["admin", "superadmin"] },
    createdCourses: [{ type: Schema.Types.ObjectId, ref: "course" }],
  },
  { timestamps: true }
);
const adminModel = mongoose.model("admin", adminSchema);

module.exports = {
  adminModel: adminModel,
};
