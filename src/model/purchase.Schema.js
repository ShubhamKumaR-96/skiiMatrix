const mongoose = require("mongoose");
const { Schema } = mongoose;


const purchaseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "course", required: true },
    transactionsId: { type: String },
    status: {
      type: String,
      default: "completed",
      enum: ["pending", "completed", "failed"],
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const purchaseModel = mongoose.model("purchase", purchaseSchema);
module.exports = {
  purchaseModel: purchaseModel,
};
